import {
  createContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type Timer = string;

interface TimerContextType {
  timer: Timer;
  money: Timer;
  times: { current: string; previous: string };
  setMoney: (money: Timer) => void;
  setTimerValues: (vals: { current: string; previous: string }) => void;
  toggleDisplayMode: () => void;
}

export const TimerContext = createContext<TimerContextType>(
  {} as TimerContextType
);

const STORAGE = {
  current: "entry_currentTime",
  previous: "entry_previousTime",
};

const months: Record<number, string> = {
  1: "січня",
  2: "лютня",
  3: "березня",
  4: "квітня",
  5: "травня",
  6: "червня",
  7: "липня",
  8: "серпня",
  9: "вересня",
  10: "жовтня",
  11: "листопада",
  12: "грудня",
};

const formatDate = (date: Date): string =>
  `${date.getDate()} ${months[date.getMonth() + 1]} ${date.getFullYear()}, ${date
    .toLocaleTimeString()
    .split(":")
    .slice(0, 2)
    .join(":")}`;

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [money, setMoney] = useState<Timer>(() => localStorage.getItem("entry_money") || "15.00");
  const [displayMode, setDisplayMode] = useState<"current" | "previous">("current");
  const [times, setTimes] = useState({ current: "", previous: "" });
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem("entry_money", money);
  }, [money]);

  /* ===== Init ===== */
  useEffect(() => {
    const now = formatDate(new Date());
    const storedPrevious = localStorage.getItem(STORAGE.previous);
    const lastCurrent = localStorage.getItem(STORAGE.current);

    // BUG FIX: On refresh, current becomes 'now', 
    // but previous stays as whatever was stored in 'previous'.
    // In your previous code, you were setting previous = lastCurrent every refresh.
    // Now it stays until a swap happens.
    
    localStorage.setItem(STORAGE.current, now);
    // If no previous exists at all, set it to now
    if (!storedPrevious) {
        localStorage.setItem(STORAGE.previous, lastCurrent || now);
    }

    setTimes({ 
        current: now, 
        previous: localStorage.getItem(STORAGE.previous) || now 
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "VolumeDown" || e.key === "ArrowDown") {
        setDisplayMode("previous");
      } else if (e.key === "VolumeUp" || e.key === "ArrowUp") {
        setDisplayMode("current");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ===== Toggle UI mode ===== */
  const toggleDisplayMode = () => {
    setDisplayMode(prev => (prev === "current" ? "previous" : "current"));
  };

  /* ===== Background swap logic ===== */
  useEffect(() => {
    if (displayMode === "previous") {
      if (swapTimeoutRef.current) return;
      
      swapTimeoutRef.current = setTimeout(() => {
        setTimes(prev => {
          const next = { current: prev.previous, previous: prev.current };
          localStorage.setItem(STORAGE.current, next.current);
          localStorage.setItem(STORAGE.previous, next.previous);
          return next;
        });
      }, 10_000);
    } else {
      if (swapTimeoutRef.current) {
        clearTimeout(swapTimeoutRef.current);
        swapTimeoutRef.current = null;
      }
    }
    return () => {
      if (swapTimeoutRef.current) clearTimeout(swapTimeoutRef.current);
    };
  }, [displayMode]);

  const setTimerValues = (vals: { current: string; previous: string }) => {
    setTimes(vals);
    localStorage.setItem(STORAGE.current, vals.current);
    localStorage.setItem(STORAGE.previous, vals.previous);
  };

  const timer = displayMode === "current" ? times.current : times.previous;

  return (
    <TimerContext.Provider
      value={{
        timer,
        money,
        times,
        setMoney,
        setTimerValues,
        toggleDisplayMode,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
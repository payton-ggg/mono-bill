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
  {} as TimerContextType,
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

let hasShiftedThisSession = false;

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [money, setMoney] = useState<Timer>(
    () => localStorage.getItem("entry_money") || "15.00",
  );
  const [displayMode, setDisplayMode] = useState<"current" | "previous">(
    "current",
  );
  const [times, setTimes] = useState({ current: "", previous: "" });
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem("entry_money", money);
  }, [money]);

  /* ===== Init ===== */
  useEffect(() => {
    if (hasShiftedThisSession) {
      setTimes({
        current: localStorage.getItem(STORAGE.current) || "",
        previous: localStorage.getItem(STORAGE.previous) || "",
      });
      return;
    }

    hasShiftedThisSession = true;

    const now = formatDate(new Date());
    const storedCurrent = localStorage.getItem(STORAGE.current);

    // Shift logic: Old Current becomes Previous, New Current is 'now'
    if (storedCurrent) {
      localStorage.setItem(STORAGE.previous, storedCurrent);
    } else {
      localStorage.setItem(STORAGE.previous, now);
    }

    localStorage.setItem(STORAGE.current, now);

    setTimes({
      current: now,
      previous: localStorage.getItem(STORAGE.previous) || now,
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
    setDisplayMode((prev) => (prev === "current" ? "previous" : "current"));
  };

  /* ===== Background swap logic ===== */
  useEffect(() => {
    if (displayMode === "previous") {
      if (swapTimeoutRef.current) return;

      swapTimeoutRef.current = setTimeout(() => {
        // Swap values ONLY in localStorage as requested.
        // This won't change the UI until the next refresh.
        const c = localStorage.getItem(STORAGE.current);
        const p = localStorage.getItem(STORAGE.previous);
        if (c && p) {
          localStorage.setItem(STORAGE.current, p);
          localStorage.setItem(STORAGE.previous, c);
        }
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

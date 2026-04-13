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
  toggleMoney: (money: Timer) => void;
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
  const [money, setMoney] = useState<Timer>("15.00");

  const [displayMode, setDisplayMode] =
    useState<"current" | "previous">("current");

  const [times, setTimes] = useState({
    current: "",
    previous: "",
  });

  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ===== Init ===== */

  useEffect(() => {
    const now = formatDate(new Date());

    const previous =
      localStorage.getItem(STORAGE.previous) ??
      localStorage.getItem(STORAGE.current) ??
      "";

    localStorage.setItem(STORAGE.current, now);

    setTimes({ current: now, previous });
  }, []);

  /* ===== Toggle UI mode ===== */

  const toggleDisplayMode = () => {
    setDisplayMode(prev => {
      const next = prev === "current" ? "previous" : "current";

      if (next === "previous") {
        startBackgroundSwapProtection();
      } else {
        cancelBackgroundSwap();
      }

      return next;
    });
  };

  /* ===== Background swap (storage only) ===== */

  const startBackgroundSwapProtection = () => {
    if (swapTimeoutRef.current) return;

    swapTimeoutRef.current = setTimeout(() => {
      const current = localStorage.getItem(STORAGE.current);
      const previous = localStorage.getItem(STORAGE.previous);

      if (!current || !previous) return;

      localStorage.setItem(STORAGE.current, previous);
      localStorage.setItem(STORAGE.previous, current);

      // ❗ НЕ трогаем React state
    }, 10_000);
  };

  const cancelBackgroundSwap = () => {
    if (!swapTimeoutRef.current) return;
    clearTimeout(swapTimeoutRef.current);
    swapTimeoutRef.current = null;
  };

  const timer =
    displayMode === "current" ? times.current : times.previous;

  return (
    <TimerContext.Provider
      value={{
        timer,
        money,
        toggleMoney: setMoney,
        toggleDisplayMode,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
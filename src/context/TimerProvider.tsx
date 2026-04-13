import {
  createContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/* =======================
   Types
======================= */

type Timer = string;

interface TimerContextType {
  timer: Timer;
  toggleTimer: (time: Timer) => void;
  money: Timer;
  toggleMoney: (money: Timer) => void;
}

/* =======================
   Context
======================= */

// eslint-disable-next-line react-refresh/only-export-components
export const TimerContext = createContext<TimerContextType>(
  {} as TimerContextType
);

/* =======================
   Helpers
======================= */

const STORAGE_KEYS = {
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
  `${date.getDate()} ${
    months[date.getMonth() + 1]
  } ${date.getFullYear()}, ${date
    .toLocaleTimeString()
    .split(":")
    .slice(0, 2)
    .join(":")}`;

const storage = {
  getCurrent: () => localStorage.getItem(STORAGE_KEYS.current),
  getPrevious: () => localStorage.getItem(STORAGE_KEYS.previous),
  setCurrent: (v: string) =>
    localStorage.setItem(STORAGE_KEYS.current, v),
  setPrevious: (v: string) =>
    localStorage.setItem(STORAGE_KEYS.previous, v),
};

/* =======================
   Provider
======================= */

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timer, setTimer] = useState<Timer>();
  const [money, setMoney] = useState<Timer>();

  const [displayMode, setDisplayMode] =
    useState<"current" | "previous">("current");

  const [times, setTimes] = useState<{
    current: string;
    previous: string;
  }>({ current: "", previous: "" });

  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  /* =======================
     Init (refresh safe)
  ======================= */

  useEffect(() => {
    const now = formatDate(new Date());

    const storedPrevious =
      storage.getPrevious() ?? storage.getCurrent() ?? "";

    storage.setCurrent(now);

    setTimes({
      current: now,
      previous: storedPrevious,
    });
  }, []);

  /* =======================
     Commit logic (hold)
  ======================= */

  const startCommitTimer = () => {
    if (swapTimeoutRef.current) return;

    swapTimeoutRef.current = setTimeout(() => {
      setTimes(prev => {
        const newCurrent = formatDate(new Date());

        storage.setPrevious(prev.current);
        storage.setCurrent(newCurrent);

        return {
          current: newCurrent,
          previous: prev.current,
        };
      });
    }, 10_000);
  };

  const cancelCommitTimer = () => {
    if (!swapTimeoutRef.current) return;
    clearTimeout(swapTimeoutRef.current);
    swapTimeoutRef.current = null;
  };

  /* =======================
     Keyboard (desktop / Android)
  ======================= */

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "VolumeDown" || e.key === "ArrowDown") {
        setDisplayMode("previous");
        startCommitTimer();
      }

      if (e.key === "VolumeUp" || e.key === "ArrowUp") {
        setDisplayMode("current");
        cancelCommitTimer();
      }
    };

    const onKeyUp = () => {
      setDisplayMode("current");
      cancelCommitTimer();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  /* =======================
     Touch (iOS / mobile)
  ======================= */

  useEffect(() => {
    const onTouchStart = () => {
      setDisplayMode("previous");
      startCommitTimer();
    };

    const onTouchEnd = () => {
      setDisplayMode("current");
      cancelCommitTimer();
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  /* =======================
     API
  ======================= */

  const toggleTimer = (time: Timer) => setTimer(time);
  const toggleMoney = (money: Timer) => setMoney(money);

  const activeTimer =
    timer ??
    (displayMode === "current"
      ? times.current
      : times.previous);

  return (
    <TimerContext.Provider
      value={{
        timer: activeTimer,
        toggleTimer,
        money: money ?? "15.00",
        toggleMoney,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
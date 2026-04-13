import { createContext, useState, useEffect, useRef, type ReactNode } from "react";

type Timer = string;

interface TimerContextType {
  timer: Timer;
  toggleTimer: (time: Timer) => void;
  money: Timer;
  toggleMoney: (money: Timer) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TimerContext = createContext<TimerContextType>(
  {} as TimerContextType
);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timer, setTimer] = useState<Timer>();
  const [money, setMoney] = useState<Timer>();
  
  const [displayMode, setDisplayMode] = useState<"current" | "previous">("current");
  const [times, setTimes] = useState<{ current: string, previous: string }>({ current: "", previous: "" });
  
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const months = {
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

  const getFormattedDate = (date: Date) => {
    return `${date.getDate()} ${
      (months as Record<number, string>)[date.getMonth() + 1]
    } ${date.getFullYear()}, ${date
      .toLocaleTimeString()
      .split(":")
      .slice(0, 2)
      .join(":")}`;
  };

  useEffect(() => {
    // 1. Initialize times on mount (refresh)
    const storedCurrent = localStorage.getItem("entry_currentTime");
    const nowFormatted = getFormattedDate(new Date());

    let finalPrevious = "";
    if (storedCurrent) {
      finalPrevious = storedCurrent;
      localStorage.setItem("entry_previousTime", storedCurrent);
    } else {
      // First time ever
      finalPrevious = nowFormatted; 
      localStorage.setItem("entry_previousTime", nowFormatted);
    }
    
    localStorage.setItem("entry_currentTime", nowFormatted);
    
    setTimes({
      current: nowFormatted,
      previous: finalPrevious
    });

    // 2. Hardware button listeners
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

  useEffect(() => {
    // 3. Swap logic: if "previous" is held for 10 seconds
    if (displayMode === "previous") {
      swapTimerRef.current = setTimeout(() => {
        setTimes(prev => {
          const newTimes = {
            current: prev.previous,
            previous: prev.current
          };
          localStorage.setItem("entry_currentTime", newTimes.current);
          localStorage.setItem("entry_previousTime", newTimes.previous);
          return newTimes;
        });
        // Stay in previous mode (which now has the "old current" value)
        // or actually the dev might want to switch back? 
        // "значение переменных currentTime и previousTime должны поменяться местами"
      }, 10000);
    } else {
      if (swapTimerRef.current) {
        clearTimeout(swapTimerRef.current);
        swapTimerRef.current = null;
      }
    }

    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    };
  }, [displayMode]);

  const toggleTimer = (time: Timer) => {
    setTimer(time);
  };

  const toggleMoney = (money: Timer) => {
    setMoney(money);
  };

  // Derive the displayed timer value
  const activeTimer = timer ?? (displayMode === "current" ? times.current : times.previous);

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

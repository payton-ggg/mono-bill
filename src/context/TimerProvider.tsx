// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createContext, useContext, useState, type ReactNode } from "react";

type Timer = string;

interface TimerContextType {
  timer: Timer;
  toggleTimer: (time: Timer) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TimerContext = createContext<TimerContextType>(
  {} as TimerContextType
);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [timer, setTimer] = useState<Timer>("00:00:00");

  const toggleTimer = (time: Timer) => {
    setTimer(time);
  };

  return (
    <TimerContext.Provider value={{ timer, toggleTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

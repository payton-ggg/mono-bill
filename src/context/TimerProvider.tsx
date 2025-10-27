import { createContext, useState, type ReactNode } from "react";

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
  const [timer, setTimer] = useState<Timer>();
  const months = {
    1: "січень",
    2: "лютий",
    3: "березень",
    4: "квітень",
    5: "травень",
    6: "червень",
    7: "липень",
    8: "серпень",
    9: "вересень",
    10: "жовтень",
    11: "листопад",
    12: "грудень",
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  const formattedDate = `${day} ${
    (months as Record<number, string>)[month + 1]
  } ${year}, ${time.toString()}`;
  console.log(formattedDate);
  const toggleTimer = (time: Timer) => {
    setTimer(time);
  };

  return (
    <TimerContext.Provider
      value={{ timer: timer ?? date.toLocaleTimeString(), toggleTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

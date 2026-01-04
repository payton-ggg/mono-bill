import { createContext, useState, type ReactNode } from "react";

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

  const date = new Date();

  const formattedDate = `${date.getDate()} ${
    (months as Record<number, string>)[date.getMonth() + 1]
  } ${date.getFullYear()}, ${new Date(date.getTime())
    .toLocaleTimeString()
    .split(":")
    .slice(0, 2)
    .join(":")}`;

  const toggleTimer = (time: Timer) => {
    setTimer(time);
  };

  const toggleMoney = (money: Timer) => {
    setMoney(money);
  };

  return (
    <TimerContext.Provider
      value={{
        timer: timer ?? formattedDate,
        toggleTimer,
        money: money ?? "15",
        toggleMoney,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

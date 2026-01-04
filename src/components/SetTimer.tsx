import { useContext } from "react";
import { TimerContext } from "../context/TimerProvider";
import { Link } from "react-router-dom";

function SetTimer() {
  const { timer, toggleTimer, money, toggleMoney } = useContext(TimerContext);

  if (!timer) {
    return null;
  }

  return (
    <>
      <h1>Monobank</h1>
      <input
        type="text"
        value={timer}
        onChange={(e) => toggleTimer(e.target.value)}
      />
      <input
        type="text"
        placeholder="Без копеек, батя все сделал уже. 15 или 7"
        value={money}
        onChange={(e) => toggleMoney(e.target.value)}
      />
      <Link to="/">Go to EPassPixel Mono</Link>
      <br />
      <br />
    </>
  );
}

export default SetTimer;

import { useContext } from "react";
import { TimerContext } from "../context/TimerProvider";
import { Link } from "react-router-dom";

function SetTimer() {
  const { timer, toggleTimer } = useContext(TimerContext);

  if (!timer) {
    return null;
  }

  return (
    <>
      <h1>Set Time</h1>
      <input
        type="text"
        value={timer}
        onChange={(e) => toggleTimer(e.target.value)}
      />
      <Link to="/">Go to EPassPixel</Link>
    </>
  );
}

export default SetTimer;

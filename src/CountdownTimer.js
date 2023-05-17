import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";
import TimerIcon from "@mui/icons-material/Timer";

const CountdownTimer = ({ minutes, seconds, setEndGame }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      setEndGame(true);
    }

    return () => clearInterval(intervalId);
  }, [setEndGame, timeLeft]);

  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <div className="countdownTimer">
      <TimerIcon className="countdownTimer__icon" />
      <h3 className="countdownTimer__text">
        {minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
      </h3>
    </div>
  );
};

export default CountdownTimer;

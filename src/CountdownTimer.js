import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCountDownIsFinished } from "./features/coundownTimerSlice";

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
    <h1>
      {minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
    </h1>
  );
};

export default CountdownTimer;

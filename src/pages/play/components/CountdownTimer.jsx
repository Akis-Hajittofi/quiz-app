import { useState, useEffect } from "react";
import { Hourglass } from "lucide-react";

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
    <span className="flex flex-row space-x-2 items-center font-semibold text-indigo-950 font-sans text-3xl">
      <Hourglass size={30} />
      <span>
        {minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
      </span>
    </span>
  );
};

export default CountdownTimer;

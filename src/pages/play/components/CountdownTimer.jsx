import { useState, useEffect } from "react";
import { Hourglass } from "lucide-react";
import { useContext } from "react";
import { ResultsContext } from "../../../results-provider";

const CountdownTimer = ({ timeLimitSeconds, gameEnd, setGameEnd }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const [results, setResults] = useContext(ResultsContext);
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft % 60;

  const timerDisplay = `${minutesLeft}:${
    secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
  }`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      setGameEnd(true);
    }

    if (gameEnd) {
      console.log("sedffeds");
    }
    setResults({ ...results, timer: timerDisplay });

    return () => clearInterval(intervalId);
  }, [setGameEnd, timeLeft, gameEnd]);

  return (
    <span className="flex flex-row space-x-2 items-center font-semibold text-indigo-950 font-sans text-3xl">
      <Hourglass size={30} />
      <span>{timerDisplay}</span>
    </span>
  );
};

export default CountdownTimer;

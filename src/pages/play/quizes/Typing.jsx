/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import CountdownTimer from "../components/CountdownTimer";
import { useNavigate } from "react-router-dom";
import Answers from "../components/Answers";
import { ArrowLeft, Coins, Skull } from "lucide-react";
import { ResultsContext } from "../../../results-provider";

function Typing({ quiz }) {
  const navigate = useNavigate();
  const maxScore = quiz.data.length;
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [results, setResults] = useContext(ResultsContext);

  const [input, setInput] = useState("");
  const [scoredAnswers, setScoredAnswers] = useState(
    Array.from({ length: quiz.data.length }, () => ({
      name: " ",
      scoredAnswer: false,
    }))
  );

  useEffect(() => {
    if (gameEnd) {
      setResults({
        ...results,
        quiz,
        score,
        scoredAnswers,
        percentage,
        maxScore,
      });
      navigate("/results");
    }
  }, [gameEnd, setGameEnd]);

  const checkInput = (e) => {
    setInput(e.target.value);
    const value = e.target.value.toLowerCase();

    const correctAnswersLowerCase = scoredAnswers.map((obj) =>
      obj.name.toLowerCase()
    );

    const index = quiz.data.findIndex((item) => {
      return item.name.toLowerCase() === value;
    });

    if (index !== -1 && !correctAnswersLowerCase.includes(value)) {
      recordCorrectAnswer(index);
    }
  };

  const recordCorrectAnswer = (index) => {
    const incrementedScore = score + 1;
    const updatedCorrectAnswers = [...scoredAnswers];
    const str = quiz.data[index].name;
    updatedCorrectAnswers[index] = {
      name: str.charAt(0).toUpperCase() + str.slice(1),
      scoredAnswer: true,
    };

    setScoredAnswers([...updatedCorrectAnswers]);

    const calculatePercentage = (incrementedScore, maxScore) => {
      return ((incrementedScore / maxScore) * 100).toFixed(2);
    };
    setPercentage(calculatePercentage(incrementedScore, maxScore));

    setScore(incrementedScore);
    if (incrementedScore === maxScore) {
      setGameEnd(true);
    }
    setInput("");
  };

  return (
    <div className="lg:w-2/3 mx-auto">
      <div className="flex flex-row mt-4 justify-between items-start px-5">
        <button
          onClick={() => navigate("/")}
          className="text-indigo-950 grid place-content-center hover:bg-indigo-50 hover:bg-opacity-50 hover:shadow-sm hover:rounded-full transition-all duration-100 ease-in-out"
        >
          <ArrowLeft size={35} />
        </button>
        <button
          onClick={() => setGameEnd(true)}
          className="text-indigo-950 grid place-content-center hover:bg-indigo-50 hover:bg-opacity-50 hover:shadow-sm hover:rounded-full transition-all duration-100 ease-in-out"
        >
          <Skull size={30} />
        </button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <div className="flex flex-row py-7">
          <div className="flex flex-col items-center">
            <span className="text-indigo-950 mb-4 font-semibold font-sans text-3xl">
              {quiz.name}
            </span>
            <input
              className="border border-indigo-950 w-96 h-10 rounded-3xl text-xl text-indigo-950 text-center placeholder-indigo-100 placeholder-text"
              value={input}
              type="text"
              placeholder={`Enter ${quiz.itemName}`}
              onChange={checkInput}
            />
          </div>
        </div>
        <CountdownTimer
          minutes={quiz.timeLimit.minutes}
          seconds={quiz.timeLimit.seconds}
          setGameEnd={setGameEnd}
          endGame={gameEnd}
        />
        <div className="flex flex-row w-11/12  px-8 space-x-3 items-center font-semibold text-indigo-950 font-sans text-3xl">
          <Coins size={30} />
          <span>{`${score}/${maxScore}`}</span>

          <div className="flex justify-start w-full h-5 bg-indigo-100 border border-indigo-200 shadow-sm rounded-full">
            <div
              className={`bg-indigo-950 h-5 rounded-full`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <Answers answers={scoredAnswers} gameEnd={false} />
    </div>
  );
}

export default Typing;

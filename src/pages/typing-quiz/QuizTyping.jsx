import { useEffect, useState } from "react";
import "./QuizTyping.css";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import { useLocation, useNavigate } from "react-router-dom";
import Answers from "../../components/answers/Answers";
import Result from "../result/Result";
import { getQuiz } from "../../utils/getQuiz";
import { ArrowLeft, DoorOpen } from "lucide-react";

function TypingQuiz() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const answers = getQuiz(state.quiz);
  const maxScore = answers.data.length;
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  // let [percentage, setPercentage] = useState(0);

  // useEffect(() => {
  //   setPercentage(percentage);
  // }, [percentage, setPercentage]);

  // const calculatePercentage = (score, maxScore) => {
  //   return ((score / maxScore) * 100).toFixed(2).replace(/\.0*$/, "");
  // };

  const [input, setInput] = useState("");
  const [scoredAnswers, setScoredAnswers] = useState(
    Array.from({ length: answers.data.length }, () => ({
      name: " ",
      scoredAnswer: false,
    }))
  );

  const checkInput = (e) => {
    setInput(e.target.value);
    const value = e.target.value.toLowerCase();

    const correctAnswersLowerCase = scoredAnswers.map((obj) =>
      obj.name.toLowerCase()
    );

    const index = answers.data.findIndex((item) => {
      return item.name.toLowerCase() === value;
    });

    if (index !== -1 && !correctAnswersLowerCase.includes(value)) {
      recordCorrectAnswer(index);
    }
  };

  const recordCorrectAnswer = (index) => {
    const incrementedScore = score + 1;
    const updatedCorrectAnswers = [...scoredAnswers];
    const str = answers.data[index].name;
    updatedCorrectAnswers[index] = {
      name: str.charAt(0).toUpperCase() + str.slice(1),
      scoredAnswer: true,
    };

    setScoredAnswers([...updatedCorrectAnswers]);
    setScore(incrementedScore);
    console.log((incrementedScore / maxScore) * 100);
    if (incrementedScore === maxScore) {
      setEndGame(true);
    }
    setInput("");
  };
  console.log(scoredAnswers);

  return (
    <div className="p-5">
      <div className="flex flex-row w-full mt-4 justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-indigo-950 w-16 grid place-content-center hover:bg-indigo-50 hover:bg-opacity-50 hover:shadow-sm hover:rounded-full transition-all duration-100 ease-in-out"
        >
          <ArrowLeft size={35} />
        </button>

        <CountdownTimer
          minutes={answers.timeLimit.minutes}
          seconds={answers.timeLimit.seconds}
          setEndGame={setEndGame}
        />
        <button
          onClick={() => setEndGame(true)}
          className="text-indigo-950 w-16 grid place-content-center hover:bg-indigo-50 hover:bg-opacity-50 hover:shadow-sm hover:rounded-full transition-all duration-100 ease-in-out"
        >
          <DoorOpen size={30} />
        </button>
      </div>

      <div className="flex flex-col py-28">
        <div className="flex flex-col items-center">
          <span className="text-indigo-950 mb-4 w-fit font-semibold font-sans text-3xl">
            {answers.name}
          </span>{" "}
          <input
            className="border border-indigo-950 w-96 h-10 rounded-3xl text-xl text-indigo-950 text-center placeholder-indigo-100 placeholder-text"
            value={input}
            type="text"
            placeholder={`Enter ${answers.itemName}`}
            onChange={checkInput}
          />
        </div>
      </div>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-indigo-950"></div>
        <span className="flex-shrink mx-4 text-indigo-950 text-2xl font-sans">
          Scoreboard
        </span>
        <div className="flex-grow border-t border-indigo-950"></div>
      </div>
      {/* <progress value={percentage} max={100} /> */}

      {!endGame ? (
        <>
          <Answers answers={scoredAnswers} quizFinished={false} />
        </>
      ) : (
        <Result
          name={answers.name}
          score={score}
          maxScore={maxScore}
          scoredAnswers={scoredAnswers}
          fileName={state.quiz}
        />
      )}
    </div>
  );
}

export default TypingQuiz;

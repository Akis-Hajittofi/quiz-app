import React, { useState } from "react";
import "./QuizTyping.css";
import CountdownTimer from "./CountdownTimer";
import { useLocation } from "react-router-dom";
import Answers from "./Answers";
import GradingIcon from "@mui/icons-material/Grading";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Result from "./Result";

function QuizTyping() {
  const { state } = useLocation();
  const { quiz } = state;
  const answers = require(`./data/${quiz}.json`);
  const maxScore = answers.data.length;

  const [input, setInput] = useState("");
  const [scoredAnswers, setScoredAnswers] = useState(
    Array.from({ length: answers.data.length }, () => ({
      name: " ",
      scoredAnswer: false,
    }))
  );

  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);

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
    if (incrementedScore === maxScore) {
      setEndGame(true);
    }
    setInput("");
  };

  return (
    <div className="quizTyping">
      <div className="quizTyping__header">
        <img src={answers.image} alt="" />
        <div className="quizTyping__headerTitle">
          <h1>{answers.name}</h1>
          <h2>{answers.subtitle}</h2>
        </div>
      </div>

      {!endGame ? (
        <>
          <div className="quizTyping__top">
            <div className="quizTyping__topInput">
              <h3>Enter {answers.itemName}:</h3>
              <input value={input} type="text" onChange={checkInput} />
            </div>

            <div className="quizTyping__topInfoAndQuit">
              <CountdownTimer
                minutes={answers.timeLimit.minutes}
                seconds={answers.timeLimit.seconds}
                setEndGame={setEndGame}
              />

              <div className="quizTyping__topScore">
                <GradingIcon className="quizTyping__topIcon" />
                <h3 className="quizTyping__topScoreText">
                  {score}/{answers.data.length}
                </h3>
              </div>
              <div
                className="quizTyping__topGiveUp"
                onClick={() => setEndGame(true)}
              >
                <DirectionsRunIcon className={"quizTyping__topGiveUpIcon"} />
                <h3>Give up</h3>
              </div>
            </div>
          </div>
          <Answers answers={scoredAnswers} quizFinished={false} />
        </>
      ) : (
        <Result
          name={answers.name}
          score={score}
          maxScore={maxScore}
          scoredAnswers={scoredAnswers}
          fileName={quiz}
        />
      )}
    </div>
  );
}

export default QuizTyping;

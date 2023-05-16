import React, { useEffect, useState } from "react";
import "./QuizTyping.css";
import CountdownTimer from "./CountdownTimer";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function QuizTyping() {
  const { state } = useLocation();
  const { quiz } = state;
  const navigate = useNavigate();
  const answers = require(`./data/${quiz}.json`);
  const maxScore = answers.data.length;

  const [input, setInput] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(
    Array.from({ length: answers.data.length }, () => "")
  );

  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    if (endGame === true) {
      navigate("/result", {
        state: {
          quiz: { name: answers.name, maxScore: maxScore },
          score: score,
        },
      });
    }
  }, [maxScore, answers.name, endGame, navigate, score]);

  const checkInput = (e) => {
    setInput(e.target.value);
    const value = e.target.value.toLowerCase();

    const correctAnswersLowerCase = correctAnswers.map((str) =>
      str.toLowerCase()
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
    const updatedCorrectAnswers = [...correctAnswers];
    const str = answers.data[index].name;
    updatedCorrectAnswers[index] = str.charAt(0).toUpperCase() + str.slice(1);

    setCorrectAnswers([...updatedCorrectAnswers]);
    setScore(incrementedScore);
    if (incrementedScore === maxScore) {
      setEndGame(true);
    }
    setInput("");
  };

  return (
    <div className="quizTyping">
      <div className="quizTyping__input">
        <input value={input} type="text" onChange={checkInput} />
      </div>
      <h1>
        THE SCORE IS: {score}/{answers.data.length}
      </h1>
      {/* <h2 onClick={() => setEndGame(true)}>End the game</h2> */}
      <CountdownTimer
        minutes={answers.timeLimit.minutes}
        seconds={answers.timeLimit.seconds}
        setEndGame={setEndGame}
      />

      <Button onClick={() => setEndGame(true)}>End Quiz</Button>
      <ol className="quizTyping__correctAnswers">
        {correctAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ol>
    </div>
  );
}

export default QuizTyping;

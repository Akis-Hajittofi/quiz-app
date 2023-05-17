import React, { useEffect, useState } from "react";
import "./QuizTyping.css";
import CountdownTimer from "./CountdownTimer";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Answers from "./Answers";

function QuizTyping() {
  const { state } = useLocation();
  const { quiz } = state;
  const navigate = useNavigate();
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

  useEffect(() => {
    if (endGame === true) {
      navigate("/result", {
        state: {
          quiz: {
            name: answers.name,

            maxScore: maxScore,
          },
          correctAnswers: scoredAnswers,
          score: score,
          fileName: quiz,
        },
      });
    }
  }, [maxScore, answers.name, endGame, navigate, score, scoredAnswers, quiz]);

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
      <div className="quizTyping__input">
        <input value={input} type="text" onChange={checkInput} />
      </div>
      <h1>
        THE SCORE IS: {score}/{answers.data.length}
      </h1>
      <CountdownTimer
        minutes={answers.timeLimit.minutes}
        seconds={answers.timeLimit.seconds}
        setEndGame={setEndGame}
      />

      <Button onClick={() => setEndGame(true)}>End Quiz</Button>

      <Answers answers={scoredAnswers} quizFinished={false} />
    </div>
  );
}

export default QuizTyping;

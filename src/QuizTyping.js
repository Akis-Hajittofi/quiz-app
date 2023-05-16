import React, { useEffect, useState } from "react";
import "./QuizTyping.css";
import CountdownTimer from "./CountdownTimer";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function QuizTyping() {
  const [input, setInput] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();
  const { quiz } = state;

  const answers = require(`./data/${quiz}.json`);

  useEffect(() => {
    if (endGame === true) {
      navigate("/result", {
        state: {
          quiz: { name: answers.name, maxScore: answers.data.length },
          score: score,
        },
      });
    }
  }, [answers.data.length, answers.name, endGame, navigate, score]);

  const checkInput = (e) => {
    setInput(e.target.value);
    const value = e.target.value.toLowerCase();
    let isCorrect = undefined;

    answers.data.forEach((item) => {
      const itemName = item.name.toLowerCase();

      if (itemName === value) {
        if (correctAnswers.includes(itemName)) {
          // console.log(`${stateName} already given`);
          isCorrect = false;
        } else {
          isCorrect = true;
        }
      }
    });

    if (isCorrect) {
      const currentScore = score;
      setCorrectAnswers([...correctAnswers, value]);
      setScore(currentScore + 1);
      setInput("");
    }
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
      <ol>
        {correctAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ol>
    </div>
  );
}

export default QuizTyping;

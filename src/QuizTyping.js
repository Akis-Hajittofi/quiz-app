import React, { useEffect, useState } from "react";
import "./QuizTyping.css";
import CountdownTimer from "./CountdownTimer";
import { useNavigate } from "react-router-dom";

function QuizTyping() {
  const [input, setInput] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const navigate = useNavigate();

  const answers = require("./Data/us-states.json");

  //   console.log("THE CORRECT ANSWERS: ", correctAnswers);

  useEffect(() => {
    if (endGame === true) {
      navigate("/result");
    }
  }, [endGame, navigate]);

  const checkInput = (e) => {
    setInput(e.target.value);
    const value = e.target.value.toLowerCase();
    let isCorrect = undefined;

    answers.forEach((state) => {
      const stateName = state.name.toLowerCase();

      if (stateName === value) {
        if (correctAnswers.includes(stateName)) {
          console.log(`${stateName} already given`);
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
      <h1>THE SCORE IS: {score}/50</h1>
      <CountdownTimer minutes={0} seconds={20} setEndGame={setEndGame} />
      <ol>
        {correctAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ol>
    </div>
  );
}

export default QuizTyping;

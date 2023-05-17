import React from "react";
import { useLocation } from "react-router-dom";
import Answers from "./Answers";

function Result() {
  const { state } = useLocation();
  const { quiz, score, correctAnswers, fileName } = state;

  const calculatePercentage = (score, maxScore) => {
    return ((score / maxScore) * 100).toFixed(2).replace(/\.0*$/, "");
  };

  const retriveAnswer = (index) => {
    const answers = require(`./data/${fileName}.json`);
    const str = answers.data[index].name;
    console.log("Retrieve answer: ", str);
    return str;
  };

  const filledAnswers = correctAnswers.map((obj, index) =>
    obj.name === " " ? { name: retriveAnswer(index), scoredAnswer: false } : obj
  );
  console.log("filledAnswers === ", filledAnswers);

  return (
    <div className="result">
      <h1>RESULT PAGE</h1>
      <p>
        You scored {score}/{quiz.maxScore}, getting{" "}
        {calculatePercentage(score, quiz.maxScore)}% in the {quiz.name} quiz!
      </p>

      <Answers answers={filledAnswers} quizFinished={true} />
    </div>
  );
}

export default Result;

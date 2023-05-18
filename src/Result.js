import React from "react";
import Answers from "./Answers";

function Result({ name, maxScore, score, scoredAnswers, fileName }) {
  const calculatePercentage = (score, maxScore) => {
    return ((score / maxScore) * 100).toFixed(2).replace(/\.0*$/, "");
  };

  const retriveAnswer = (index) => {
    const answers = require(`./data/${fileName}.json`);
    const str = answers.data[index].name;
    return str;
  };

  const filledAnswers = scoredAnswers.map((obj, index) =>
    obj.name === " " ? { name: retriveAnswer(index), scoredAnswer: false } : obj
  );

  return (
    <div className="result">
      <h1>RESULT PAGE</h1>
      <p>
        You scored {score}/{maxScore}, getting{" "}
        {calculatePercentage(score, maxScore)}% in the {name} quiz!
      </p>

      <Answers answers={filledAnswers} quizFinished={true} />
    </div>
  );
}

export default Result;

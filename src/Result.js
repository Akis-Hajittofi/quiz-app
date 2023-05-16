import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const { quiz, score } = state;

  const calculatePercentage = (score, maxScore) => {
    return ((score / maxScore) * 100).toFixed(2).replace(/\.0*$/, "");
  };

  return (
    <div className="result">
      <h1>RESULT PAGE</h1>
      <p>
        You scored {score}/{quiz.maxScore}, getting{" "}
        {calculatePercentage(score, quiz.maxScore)}% in the {quiz.name} quiz!
      </p>
    </div>
  );
}

export default Result;

import React from "react";
import "./Answers.css";

function Answers({ answers, quizFinished }) {
  const scoredAnswers = answers;
  return (
    <ol className="answers">
      {scoredAnswers.map((obj, index) => (
        <li
          className={
            quizFinished
              ? obj.scoredAnswer
                ? "answer__correct"
                : "answer__incorrect"
              : ""
          }
          key={index}
        >
          <span>{`${index + 1}) `}</span>
          {obj.name}
        </li>
      ))}
    </ol>
  );
}

export default Answers;

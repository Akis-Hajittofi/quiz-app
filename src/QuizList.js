import React from "react";
import QuizRow from "./QuizRow";
import "./QuizList.css";

function QuizList() {
  const list = require("./data/list/list.json");

  return (
    <div className="quizList">
      {list.data.map((quiz) => (
        <QuizRow
          name={quiz.name}
          subtitle={quiz.subtitle}
          quizType={quiz.quizType}
          fileName={quiz.fileName}
          image={quiz.image}
        />
      ))}
    </div>
  );
}

export default QuizList;

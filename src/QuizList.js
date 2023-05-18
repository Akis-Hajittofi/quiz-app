import React from "react";
import QuizRow from "./QuizRow";
import "./QuizList.css";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";

function QuizList() {
  const list = require("./data/list/list.json");
  const navigate = useNavigate();

  const randomQuiz = () => {
    const randomisedQuiz =
      list.data[Math.floor(Math.random() * list.data.length)];

    console.log("RANDOM: ", randomisedQuiz);

    navigate(`/quiz-${randomisedQuiz.quizType}`, {
      state: { quiz: randomisedQuiz.fileName },
    });
  };

  return (
    <div className="quizList">
      <div onClick={randomQuiz} className="quizList__random">
        <QuizIcon className="quizList__randomIcon" />
        <h3>Random</h3>
      </div>
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

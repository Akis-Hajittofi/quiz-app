import React from "react";
import "./QuizRow.css";
import { useNavigate } from "react-router-dom";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ListIcon from "@mui/icons-material/List";

function QuizRow({ name, subtitle, quizType, fileName, image }) {
  const navigate = useNavigate();

  const getIcon = (quizType) => {
    if (quizType === "typing") {
      return <KeyboardIcon />;
    } else if (quizType === "multiple-choice") {
      return <ListIcon />;
    }
  };

  return (
    <div
      className="quizRow"
      onClick={() =>
        navigate(`/quiz-${quizType}`, { state: { quiz: fileName } })
      }
    >
      <div className="quizRow__title">
        <h2>{name}</h2>
        <h3>{subtitle}</h3>
      </div>
      {getIcon(quizType)}
      <img src={image} alt="" />
    </div>
  );
}

export default QuizRow;

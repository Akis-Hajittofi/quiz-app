import React from "react";
import Card from "./components/Card";
import "./QuizList.css";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";
import list from "../../data/list/list.json";

function Home() {
  const navigate = useNavigate();

  const randomQuiz = () => {
    const randomisedQuiz =
      list.data[Math.floor(Math.random() * list.data.length)];

    navigate(`/quiz-${randomisedQuiz.quizType}`, {
      state: { quiz: randomisedQuiz.fileName },
    });
  };

  return (
    <div className="">
      <div onClick={randomQuiz} className="quizList__random">
        <QuizIcon />
        <h3>Random</h3>
      </div>
      <div className="flex flex-row flex-wrap p-5 gap-4">
        {list.data.map((quiz, index) => (
          <Card
            name={quiz.name}
            subtitle={quiz.subtitle}
            quizType={quiz.quizType}
            fileName={quiz.fileName}
            image={quiz.image}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

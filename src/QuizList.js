import { Button } from "@mui/material";
import React from "react";
import QuizTyping from "./QuizTyping";
import { useNavigate } from "react-router-dom";

function QuizList() {
  const navigate = useNavigate();

  return (
    <div className="quizList">
      <Button
        onClick={() =>
          navigate("/quiz-typing", { state: { quiz: "pokemon-151" } })
        }
      >
        151 Original Pokémon
      </Button>

      <Button
        onClick={() =>
          navigate("/quiz-typing", { state: { quiz: "us-states" } })
        }
      >
        US States
      </Button>

      <Button
        onClick={() =>
          navigate("/quiz-typing", { state: { quiz: "european-countries" } })
        }
      >
        European Countries
      </Button>
    </div>
  );
}

export default QuizList;

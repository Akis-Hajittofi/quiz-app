import Card from "./components/Card";
import { useNavigate } from "react-router-dom";
import {
  BookText,
  Dices,
  Search,
  Shuffle,
  Gamepad2,
  LogIn,
  PersonStanding,
  Trophy,
  BookmarkCheck,
  CircleX,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { QuizzesContext } from "../../QuizzesProvider";
import Modal from "../../components/header/Modal";

function Home() {
  const { quizzes, isModalOpen, handleSelectQuiz, setSelectedQuiz } =
    useContext(QuizzesContext);

  return (
    <div className="">
      <div className="flex flex-wrap p-5 gap-4 justify-center">
        {quizzes.map((quiz, index) => (
          <Card
            name={quiz.name}
            subtitle={quiz.subheading}
            quizType={"typing"}
            image={quiz.imageUrl}
            key={index}
            onCardClick={() => {
              setSelectedQuiz(quiz);
              handleSelectQuiz(quiz);
            }}
          />
        ))}
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
}

export default Home;

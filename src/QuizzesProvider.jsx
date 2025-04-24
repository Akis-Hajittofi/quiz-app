/* eslint-disable react/prop-types */
import { useUser } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const QuizzesContext = createContext()

export default function QuizzesProvider({children}) {
    const [quizzes, setQuizzes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const navigate = useNavigate();
    const api = import.meta.env.VITE_API_URL;
    const { isSignedIn, user, isLoaded } = useUser();


    useEffect(() => {
        const fetchQuizzes = async () => {
          try {
            const response = await fetch(`${api}/quizzes/`);
            if (!response.ok) {
              throw new Error("Failed to fetch answers");
            }
            const data = await response.json();
            setQuizzes(data);
          } catch (error) {
            console.error("Error fetching answers:", error);
          }
        };
    
        fetchQuizzes();
      }, [setQuizzes]);

    const navigateToQuiz = (quiz) => {
        navigate(
          `/play/typing/${encodeURIComponent(
            quiz.name.replace(/\s+/g, "-").toLowerCase()
          )}`,
          {
            state: {
              name: quiz.name,
              quizId: quiz.quizId,
              timeLimitSeconds: quiz.timeLimitSeconds,
            },
          }
        );
      };
    
      const handleSelectQuiz = (quiz) => {
        if (!isSignedIn) {
          setIsModalOpen(true);
        } else if (isSignedIn) {
          navigateToQuiz(quiz);
        }
      };
    
      const randomQuiz = () => {
        const randomisedQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        setSelectedQuiz(randomisedQuiz);
        handleSelectQuiz(randomisedQuiz);
      };
    return (
        <QuizzesContext.Provider value={{quizzes, isModalOpen, setIsModalOpen, selectedQuiz, setSelectedQuiz, navigateToQuiz, handleSelectQuiz, randomQuiz}}>
            {children}
        </QuizzesContext.Provider>
    )
}


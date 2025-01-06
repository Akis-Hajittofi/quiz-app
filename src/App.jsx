import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Results from "./pages/play/Results";
import Home from "./pages/home/Home";
import Typing from "./pages/play/quizes/Typing";
import ResultsProvider from "./results-provider";
import { useEffect, useState } from "react";

function App() {
  const RetrieveQuizWithAnswers = () => {
    const { quizName } = useParams(); // Get the quizName from the URL
    const location = useLocation();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [loading, setLoading] = useState(true); // To track the loading state
    const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
      const fetchQuizWithAnswers = async () => {
        try {
          setLoading(true);
          const quizState = location.state;

          const retrieveAnswers = async (id) => {
            const answersResponse = await fetch(`${api}/answers/${id}`);
            if (!answersResponse.ok) {
              throw new Error("Failed to fetch answers");
            }
            const answersData = await answersResponse.json();
            setAnswers(answersData);
          };

          if (location.state && location.state.answers) {
            // If clicking try again
            console.log("NUMBER ONE");
            setQuiz(quizState);
            setAnswers(quizState.answers);
          } else {
            console.log("NUMBER TWO");
            if (location.state && !answers) {
              console.log("NUMBER THREE");
              // Get quiz from the state after clicking on card
              setQuiz(quizState);
              retrieveAnswers(quizState.QuizID);
            } else if (!location.state) {
              console.log("NUMBER FIVE");
              // Fetch the quiz & answers from DB, from typing in URL
              const quizResponse = await fetch(`${api}/quizzes/${quizName}`);
              if (!quizResponse.ok) {
                throw new Error("Failed to fetch quiz");
              }
              const quizData = await quizResponse.json();
              setQuiz(quizData);
              retrieveAnswers(quizData.QuizID);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // End loading state
        }
      };
      fetchQuizWithAnswers();
    }, [quizName]); // Fetch data when quizName changes

    if (loading) {
      return <div>Loading...</div>; // Show a loading state
    }

    if (!quiz || !answers) {
      return <div>Error loading quiz or answers.</div>; // Handle error state
    }

    return <Typing quiz={quiz} answers={answers} />;
  };

  return (
    <div className="mb-10 mx-auto">
      <div className="">
        <ResultsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/play">
              <Route
                path="typing/:quizName"
                element={<RetrieveQuizWithAnswers />}
              />
            </Route>
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </ResultsProvider>
      </div>
    </div>
  );
}

export default App;

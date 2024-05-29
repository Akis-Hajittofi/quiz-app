import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Result from "./pages/result/Result";
import Home from "./pages/home/Home";
import QuizTyping from "./pages/typing-quiz/QuizTyping";
import Header from "./components/header/Header";
import { getQuiz } from "./utils/getQuiz";
import ResultsProvider from "./results-provider";

function App() {
  let FindQuiz = () => {
    const { quizName } = useParams();
    const quiz = getQuiz(quizName);

    if (quiz) {
      return <QuizTyping quiz={quiz} />;
    } else if (!quiz) {
      return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="mb-10 mx-auto">
      {/* <Header /> */}
      <div className="">
        <ResultsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/play">
              {/* Add more routes here as I build more types of quizes */}
              <Route path="typing/:quizName" element={<FindQuiz />} />
            </Route>
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </ResultsProvider>
      </div>
    </div>
  );
}

export default App;

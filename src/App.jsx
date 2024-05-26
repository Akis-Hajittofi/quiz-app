import { Route, Routes } from "react-router-dom";
import Result from "./pages/result/Result";
import Home from "./pages/home/Home";
import QuizTyping from "./pages/typing-quiz/QuizTyping";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="">
      <Header />
      <div className="">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/result"} element={<Result />} />
          <Route path={"/quiz-typing"} element={<QuizTyping />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

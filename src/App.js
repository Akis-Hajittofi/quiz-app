import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Result from "./Result";
import QuizList from "./QuizList";
import QuizTyping from "./QuizTyping";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Routes>
          <Route path={"/"} element={<QuizList />} />
          <Route path={"/result"} element={<Result />} />
          <Route path={"/quiz-typing"} element={<QuizTyping />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

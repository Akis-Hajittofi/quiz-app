import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Result from "./pages/result/Result";
import QuizList from "./pages/QuizList/QuizList";
import QuizTyping from "./pages/QuizTyping/QuizTyping";
import Header from "./components/header/Header";


function App() {
  return (
    <div className="app">
      <Header />
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

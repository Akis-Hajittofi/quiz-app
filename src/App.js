import React from "react";
import "./App.css";
import QuizTyping from "./QuizTyping";
import { Route, Routes } from "react-router-dom";
import Result from "./Result";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Routes>
          <Route path={"/"} element={<QuizTyping />} />
          <Route path={"/result"} element={<Result />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { useContext } from "react";
import Answers from "../../components/answers/Answers";
import { ResultsContext } from "../../results-provider";

function Result() {
  const [results] = useContext(ResultsContext);
  const { score, maxScore, percentage, quiz, scoredAnswers } = results;

  const filledAnswers = scoredAnswers.map((obj, index) =>
    obj.name === " "
      ? { name: quiz.data[index].name, scoredAnswer: false }
      : obj
  );

  return (
    <div className="">
      <h1>The results are in!</h1>
      <p>
        You scored {score}/{maxScore}, getting {percentage}% in the {quiz.name}{" "}
        quiz!
      </p>

      <Answers answers={filledAnswers} gameEnd={true} />
    </div>
  );
}

export default Result;

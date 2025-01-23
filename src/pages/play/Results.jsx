import { useContext, useState } from "react";
import Answers from "./components/Answers";
import { ResultsContext } from "../../results-provider";
import { LayoutGrid, RotateCcw, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const [results] = useContext(ResultsContext);
  const { quiz, score, maxScore, percentage, answers, scoredAnswers } = results;
  const api = import.meta.env.VITE_API_URL;
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState(null);

  const filledAnswers = scoredAnswers?.map((obj, index) =>
    obj.Answer === " "
      ? { Answer: answers[index].Answer, scoredAnswer: false }
      : obj
  );

  const handleTryAgain = () => {
    navigate(
      `/play/typing/${results.quiz.Name.replace(/\s+/g, "-").toLowerCase()}`,
      {
        state: {
          Name: results.quiz.Name,
          QuizID: results.quiz.QuizID,
          TimeLimitSeconds: results.quiz.TimeLimitSeconds,
          answers: answers,
        },
      }
    );
  };

  const handleLeaderboard = () => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${api}/leaderboards/${quiz.QuizID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data);
        setShowLeaderboard(true);
      } catch (error) {
        console.error("Error fetching Leaderboard:", error);
      }
    };
    fetchLeaderboard();
  };

  return (
    <div className="lg:w-2/3 mx-auto space-y-7">
      <div className="flex flex-col text-indigo-950 space-y-2 font-semibold font-sans text-3xl items-center ">
        <div className="flex flex-col items-center mb-10">
          <span className="font-bold text-4xl">Results</span>
          <span className="">{quiz.Name}</span>
        </div>

        <div className="flex flex-col space-y-5 items-center w-3/4">
          <span className="font-bold text-3xl">
            {percentage < 20
              ? "Better luck next time!"
              : percentage < 40
              ? "Good Effort!"
              : percentage < 60
              ? "Well done!"
              : percentage < 80
              ? "Amazing"
              : "You Smashed it!"}
          </span>
          <div className="flex flex-col items-center ">
            <span className="font-thin text-2xl">Overall Score:</span>
            <span className="text-7xl">{percentage}%</span>
          </div>
          <div className="flex flex-row space-x-10">
            <div className="flex flex-col items-center">
              <span className="font-thin text-xl">Score:</span>
              <span>
                {score}/{maxScore}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-thin text-xl">Time Remaining:</span>
              <span>{results.timer}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={handleTryAgain}
              className=" bg-blue-900 text-white rounded-xl text-base w-fit h-fit p-3 grid grid-rows-auto place-content-center shadow-md"
            >
              <span className="flex flex-row space-x-1">
                <RotateCcw />
                <span>Try Again</span>
              </span>
            </button>

            <button
              onClick={() => navigate(`/`)}
              className=" bg-blue-900 text-white rounded-xl text-base w-fit h-fit p-3 grid grid-rows-auto place-content-center shadow-md"
            >
              <span className="flex flex-row space-x-1">
                <LayoutGrid />
                <span>Take Another Quiz</span>
              </span>
            </button>

            <div className="w-full flex justify-center">
              <button
                onClick={handleLeaderboard}
                className=" bg-blue-900 text-white rounded-xl text-base w-fit h-fit p-3 grid grid-rows-auto place-content-center shadow-md"
              >
                <span className="flex flex-row space-x-1">
                  <Trophy />
                  <span>Leaderboard</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLeaderboard && (
        <div className="flex justify-center mt-5">
          <table className="table-auto border-collapse border border-gray-300 shadow-sm w-full">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800 font-semibold">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
                <th className="border border-gray-300 px-4 py-2">Score %</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((obj, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-indigo-50`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {obj.Username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {obj.Score}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {obj.ScorePercentage}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(obj.DateOfScore).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Answers answers={filledAnswers} gameEnd={true} />
    </div>
  );
}

export default Results;

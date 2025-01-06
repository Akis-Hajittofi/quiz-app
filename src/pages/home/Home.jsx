import Card from "./components/Card";
import { useNavigate } from "react-router-dom";
import { BookText, Dices, Search, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const api = import.meta.env.VITE_API_URL;

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

  const randomQuiz = () => {
    const randomisedQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];

    navigate(`/play/typing/${randomisedQuiz.Name}`);
  };

  return (
    <div className="">
      <nav className=" mt-5 w-full flex justify-center space-x-8">
        <div className="flex flex-col items-center ">
          <button
            onClick={randomQuiz}
            className="bg-fuchsia-950 rounded-full w-14 h-14 p-2 grid place-content-center border-2 border-slate-300 shadow-md hover:w-28 transition-all duration-300 ease-in-out"
          >
            <Dices size={32} className="text-white" />
          </button>
          <span className="font-thin">Random</span>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-fuchsia-950 rounded-full w-14 hover:w-28 transition-all duration-300 ease-in-out h-14 grid place-content-center p-2 border-2 border-slate-300 shadow-md">
            <Search size={32} className="text-white" />
          </button>
          <span className="font-thin">Search</span>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-fuchsia-950 rounded-full w-14 hover:w-28 transition-all duration-300 ease-in-out h-14 grid place-content-center p-2 border-2 border-slate-300 shadow-md">
            <Shuffle size={32} className="text-white" />
          </button>
          <span className="font-thin">Shuffle</span>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-fuchsia-950 rounded-full w-14 hover:w-28 transition-all duration-300 ease-in-out h-14 grid place-content-center p-2 border-2 border-slate-300 shadow-md">
            <BookText size={32} className="text-white" />
          </button>
          <span className="font-thin">Topics</span>
        </div>
      </nav>

      <div className="flex flex-wrap p-5 gap-4 justify-center">
        {quizzes.map((quiz, index) => (
          <Card
            name={quiz.Name}
            subtitle={quiz.Subheading}
            quizType={"typing"}
            quizId={quiz.QuizID}
            image={quiz.ImageUrl}
            timeLimitSeconds={quiz.TimeLimitSeconds}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

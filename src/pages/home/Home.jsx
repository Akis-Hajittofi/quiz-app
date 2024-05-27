import Card from "./components/Card";
import { useNavigate } from "react-router-dom";
import list from "../../data/list/list.json";
import { BookText, Dices, Search, Shuffle } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const randomQuiz = () => {
    const randomisedQuiz =
      list.data[Math.floor(Math.random() * list.data.length)];

    navigate(`/quiz-${randomisedQuiz.quizType}`, {
      state: { quiz: randomisedQuiz.fileName },
    });
  };

  return (
    <div>
      <nav className="px-10 mt-5 w-full flex justify-center space-x-8">
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

      <div className="flex flex-row flex-wrap p-5 gap-4">
        {list.data.map((quiz, index) => (
          <Card
            name={quiz.name}
            subtitle={quiz.subtitle}
            quizType={quiz.quizType}
            fileName={quiz.fileName}
            image={quiz.image}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

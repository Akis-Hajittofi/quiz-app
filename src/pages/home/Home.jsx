import Card from "./components/Card";
import { useNavigate } from "react-router-dom";
import {
  BookText,
  Dices,
  Search,
  Shuffle,
  Gamepad2,
  LogIn,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Home() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Tracks which quiz was clicked

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

    navigate(`/play/typing/${randomisedQuiz.name}`);
  };

  const handlePlayQuiz = (quiz) => {
    const storedName = localStorage.getItem("playerName");

    if (!storedName) {
      setSelectedQuiz(quiz); // Store the clicked quiz
      setIsModalOpen(true); // Open the modal
    } else {
      navigate(`/play/typing/${quiz.name.replace(/\s+/g, "-").toLowerCase()}`, {
        state: {
          name: quiz.name,
          quizId: quiz.quizId,
          timeLimitSeconds: quiz.timeLimitSeconds,
        },
      });
    }
  };

  return (
    <div className="">
      <nav className="relative w-full h-20 px-6 flex items-center my-5">
        <div className="flex space-x-6 sm:justify-start md:justify-center w-full">
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
        </div>
        <div className="absolute top-0 right-6">
          <SignedOut>
            <div className="flex flex-col items-center">
              <SignInButton>
                <button className="bg-fuchsia-900 rounded-full w-14 transition-all duration-300 ease-in-out h-14 grid place-content-center p-2 border-2 border-slate-300 shadow-md">
                  <LogIn size={32} className="text-white" />
                </button>
              </SignInButton>
              <span className="font-thin">Log In</span>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-14 h-14",
                },
              }}
              // className="h-14"
            />
          </SignedIn>
        </div>
      </nav>

      <div className="flex flex-wrap p-5 gap-4 justify-center">
        {quizzes.map((quiz, index) => (
          <Card
            name={quiz.name}
            subtitle={quiz.subheading}
            quizType={"typing"}
            image={quiz.imageUrl}
            key={index}
            onCardClick={() => handlePlayQuiz(quiz)}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 space-y-3 max-w-md text-indigo-950">
            <h2 className="text-xl font-semibold text-center">
              Enter Your Name
            </h2>
            <p className="text-sm w-3/4 mx-auto text-center font-thin italic">
              Please be aware that your name may be visible to others on the
              leaderboard
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                if (name.trim()) {
                  localStorage.setItem("playerName", name);
                  setIsModalOpen(false);
                  handlePlayQuiz(selectedQuiz);
                }
              }}
              className="mt-4 w-full px-4 py-2 bg-fuchsia-950  text-white rounded-lg hover:bg-fuchsia-800"
            >
              <div className="flex items-center justify-center">
                <span className="pr-2">Play Quiz</span>
                <Gamepad2 className="p-0 m-0" size={25} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

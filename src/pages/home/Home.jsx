import Card from "./components/Card";
import { useNavigate } from "react-router-dom";
import {
  BookText,
  Dices,
  Search,
  Shuffle,
  Gamepad2,
  LogIn,
  PersonStanding,
  Trophy,
  BookmarkCheck,
  CircleX,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function Home() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Tracks which quiz was clicked
  const { isSignedIn, user, isLoaded } = useUser();

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

  const navigateToQuiz = (quiz) => {
    navigate(`/play/typing/${quiz.name.replace(/\s+/g, "-").toLowerCase()}`, {
      state: {
        name: quiz.name,
        quizId: quiz.quizId,
        timeLimitSeconds: quiz.timeLimitSeconds,
      },
    });
  };

  const handleSelectQuiz = (quiz) => {
    if (!isSignedIn) {
      setIsModalOpen(true);
    } else if (isSignedIn) {
      navigateToQuiz(quiz);
    }
  };

  const randomQuiz = () => {
    const randomisedQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    setSelectedQuiz(randomisedQuiz);
    handleSelectQuiz(randomisedQuiz);
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
              <span className="font-thin">Sign In</span>
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
            onCardClick={() => {
              setSelectedQuiz(quiz);
              handleSelectQuiz(quiz);
            }}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md items-center text-indigo-950">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedQuiz(null);
              }}
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-900"
            >
              <CircleX />
            </button>
            <div className="space-y-3">
              <div className="w-full flex justify-center">
                <h2 className="text-xl w-4/6 font-semibold text-center">
                  Play as a Guest or Sign Up to Unlock More Features!
                </h2>
              </div>
              <div className="space-y-3 w-full">
                <p className="flex flex-row">
                  <Gamepad2 size={30} className="mr-3 place-self-center" />
                  Track your scores and see your play logs
                </p>
                <p className="flex flex-row">
                  <Trophy size={30} className="mr-3 place-self-center" />{" "}
                  Compete on the leaderboard and earn achievements
                </p>
                <p className="flex flex-row">
                  <BookmarkCheck size={30} className="mr-3 place-self-center" />{" "}
                  Save your favourite quizzes and revisit them anytime
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <SignInButton
                  mode="modal"
                  fallbackRedirectUrl={`/play/typing/${selectedQuiz.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <button
                    // onClick={() => {
                    //   // Do something
                    // }}
                    className="mt-4 w-full px-4 py-2 bg-fuchsia-950  text-white rounded-lg hover:bg-fuchsia-800"
                  >
                    <div className="flex items-center justify-center">
                      <span className="pr-2">Sign In / Sign Up</span>
                      <LogIn className="p-0 m-0" size={25} />
                    </div>
                  </button>
                </SignInButton>
                <button
                  onClick={() => {
                    navigateToQuiz(selectedQuiz);
                  }}
                  className="mt-4 w-full px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600"
                >
                  <div className="flex items-center justify-center">
                    <span className="pr-2">Play as Guest</span>
                    <PersonStanding className="p-0 m-0" size={25} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

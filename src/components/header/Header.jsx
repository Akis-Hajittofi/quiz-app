import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BookText, Dices, LogIn, Search, Shuffle, Trophy } from "lucide-react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizzesContext } from "../../QuizzesProvider";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { randomQuiz } = useContext(QuizzesContext);

  const navIconSize = 32;

  return (
    <div className="flex items-center justify-between h-24 px-6 py-4 mb-5 bg-violet-100 shadow">
      <nav className="relative w-full h-20 px-6 flex items-center my-5">
        <h1
          className={`absolute top-5 left-6 text-indigo-950 text-3xl ${
            location.pathname === "/" && "hidden"
          } md:block hover:cursor-pointer`}
          onClick={() => navigate("/")}
        >
          Quiz App
        </h1>
        {location.pathname === "/" && (
          <div className="flex space-x-6 sm:justify-start md:justify-center w-full">
            <div className="flex flex-col items-center ">
              <button
                onClick={randomQuiz}
                className="bg-fuchsia-950 rounded-full w-14 h-14 p-2 grid place-content-center border-2 border-slate-300 shadow-md hover:w-28 transition-all duration-300 ease-in-out"
              >
                <Dices size={navIconSize} className="text-white" />
              </button>
              <span className="font-thin">Random</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-fuchsia-950 rounded-full w-14 hover:w-28 transition-all duration-300 ease-in-out h-14 grid place-content-center p-2 border-2 border-slate-300 shadow-md">
                <Search size={navIconSize} className="text-white" />
              </button>
              <span className="font-thin">Search</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-fuchsia-950 rounded-full w-14 hover:w-28 transition-all duration-300 ease-in-out h-14 grid place-content-center p-2 border-2 border-slate-300 shadow-md">
                <Shuffle size={navIconSize} className="text-white" />
              </button>
              <span className="font-thin">Shuffle</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-fuchsia-950 rounded-full w-14 hover:w-28 transition-all duration-300 ease-in-out h-14 grid place-content-center p-2 border-2 border-slate-300 shadow-md">
                <BookText size={navIconSize} className="text-white" />
              </button>
              <span className="font-thin">Topics</span>
            </div>
          </div>
        )}
        <div className="absolute top-1 right-0">
          <SignedOut>
            <div className="flex flex-col items-center top-0 right-6">
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
              className="top-5 right-6"
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Your Top Scores"
                  labelIcon={<Trophy size={15} />}
                  href="/user/leaderboards"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}

export default Header;

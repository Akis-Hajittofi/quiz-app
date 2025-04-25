import { SignInButton } from '@clerk/clerk-react';
import { BookmarkCheck, CircleX, Gamepad2, LogIn, PersonStanding, Trophy } from 'lucide-react';
import { useContext } from 'react'
import { QuizzesContext } from '../../QuizzesProvider';

function Modal() {
    const {setIsModalOpen, navigateToQuiz, setSelectedQuiz, selectedQuiz} = useContext(QuizzesContext)
  return (
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
              <Trophy size={30} className="mr-3 place-self-center" /> Compete on
              the leaderboard and earn achievements
            </p>
            <p className="flex flex-row">
              <BookmarkCheck size={30} className="mr-3 place-self-center" />{" "}
              Save your favourite quizzes and revisit them anytime
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={`/play/typing/${encodeURIComponent(
                selectedQuiz.name.replace(/\s+/g, "-").toLowerCase()
              )}`}
            >
              <button className="mt-4 w-full px-4 py-2 bg-fuchsia-950  text-white rounded-lg hover:bg-fuchsia-800">
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
  );
}

export default Modal
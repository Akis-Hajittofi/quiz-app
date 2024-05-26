import React from "react";
// import "./QuizRow.css";
import { useNavigate } from "react-router-dom";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ListIcon from "@mui/icons-material/List";
import { PlayIcon } from "../../../assets/icons";
import { Bookmark, CirclePlay, Keyboard } from "lucide-react";

function Card({ name, subtitle, quizType, fileName, image }) {
  const navigate = useNavigate();

  const getIcon = (quizType) => {
    if (quizType === "typing") {
      return <Keyboard size={25} className="text-white inline" />;
    } else if (quizType === "multiple-choice") {
      return <ListIcon size={25} className="text-white inline" />;
    }
  };

  // TODO:
  // Finish off the design of the cards so that I can move on to the Quiz Typing page.
  // Don't spend too much time on this for now, I need to get more functionality done.
  // Have the play button on the bottom right
  // Look into changing the font style of my app using Tailwind
  // Have some sort of nav or filtering on this page as well

  return (
    <div
      className="relative w-56 h-fit rounded-lg border bg-card text-card-foreground shadow-sm"
      onClick={() =>
        navigate(`/quiz-${quizType}`, { state: { quiz: fileName } })
      }
    >
      <div className="h-32 rounded-t-md overflow-hidden ...">
        <img src={image} alt="" className="" />
      </div>

      <div className="flex flex-col justify-between p-3 h-52">
        <div className="flex flex-col text-indigo-950">
          <div className="font-bold font-sans text-xl ">
            <span className="p-0 m-0 inline space-x-1">{name}</span>
          </div>
          <span className="text-xs italic py-1">{subtitle}</span>
        </div>

        <div className="flex flex-row justify-between ">
          <Bookmark size={35} strokeWidth={1} className=" text-fuchsia-950" />
          <CirclePlay size={35} strokeWidth={1} className=" text-fuchsia-950" />
        </div>
      </div>
      <span className="pb-1 m-0 absolute left-2 top-2  bg-fuchsia-950 p-1 rounded-md">
        {" "}
        {getIcon(quizType)}
      </span>
    </div>
  );
}

export default Card;

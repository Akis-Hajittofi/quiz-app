import { useNavigate } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import { Bookmark, Gamepad2, Keyboard } from "lucide-react";

function Card({ name, subtitle, quizType, fileName, image }) {
  const navigate = useNavigate();

  const getIcon = (quizType) => {
    if (quizType === "typing") {
      return <Keyboard size={24} className="text-white inline" />;
    } else if (quizType === "multiple-choice") {
      return <ListIcon size={25} className="text-white inline" />;
    }
  };

  return (
    <div className="relative w-full sm:w-56 h-fit rounded-lg border bg-card text-card-foreground  hover:shadow-md hover:scale-105 transition-all duration-300 hover:cursor-pointer">
      <div className="h-36 rounded-t-md overflow-hidden ...">
        <img src={image} alt="" className="" />
      </div>

      <div className="flex flex-col justify-between p-3 h-40 sm:h-48">
        <div className="flex flex-col text-indigo-950">
          <div className="font-bold font-sans text-xl ">
            <span className="p-0 m-0 inline space-x-1">{name}</span>
          </div>
          <span className="text-xs italic py-1">{subtitle}</span>
        </div>

        <div className="flex flex-row justify-between ">
          <Bookmark size={35} strokeWidth={1} className=" text-fuchsia-950" />
          <Gamepad2
            size={35}
            strokeWidth={1}
            className=" text-fuchsia-950 hover:cursor-pointer"
            onClick={() => navigate(`/play/typing/${fileName}`)}
          />
        </div>
      </div>
      <span className="absolute left-2 top-2 grid place-content-center bg-fuchsia-950 p-1 rounded-md">
        {" "}
        {getIcon(quizType)}
      </span>
    </div>
  );
}

export default Card;

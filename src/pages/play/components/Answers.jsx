function Answers({ answers, gameEnd }) {
  return (
    <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
      {answers?.map((obj, index) => (
        <span
          className={`w-48 shadow-sm p-1 border font-sans text-xl ${
            gameEnd ? (obj.scoredAnswer ? "bg-green-300" : "bg-red-400") : ""
          }`}
          key={index}
        >
          <span className="text-indigo-800 font-thin">{`${index + 1}) `}</span>
          <span className="text-indigo-950">{`${obj.Answer} `}</span>
        </span>
      ))}
    </div>
  );
}

export default Answers;

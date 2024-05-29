function Answers({ answers, quizFinished }) {
  const scoredAnswers = answers;
  return (
    <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
      {scoredAnswers.map((obj, index) => (
        <span
          className=" w-48 shadow-sm  p-1 border font-sans text-xl  "
          key={index}
        >
          <span className="text-indigo-800 font-thin">{`${index + 1}) `}</span>
          <span className="text-indigo-950">{`${obj.name} `}</span>
        </span>
      ))}
    </div>
  );
}

export default Answers;

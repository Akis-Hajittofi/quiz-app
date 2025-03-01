import { createContext, useState } from "react";

export const ResultsContext = createContext();

export default function ResultsProvider({ children }) {
  const [results, setResults] = useState();

  return (
    <ResultsContext.Provider value={[results, setResults]}>
      {children}
    </ResultsContext.Provider>
  );
}

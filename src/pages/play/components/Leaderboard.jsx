/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

function Leaderboard({ quizId }) {
  const api = import.meta.env.VITE_API_URL;

  const [leaderboard, setLeaderboard] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalRows: 0,
  });

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${api}/leaderboards/${quizId}?page=${meta.currentPage}&limit=${meta.pageSize}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data.data);

        setMeta(data.meta);
      } catch (error) {
        console.error("Error fetching Leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  const handleShowMore = () => {
    const nextPage = meta.currentPage + 1;
    const showMore = async () => {
      try {
        const response = await fetch(
          `${api}/leaderboards/${quizId}?page=${nextPage}&limit=${meta.pageSize}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard((prevLeaderboard) => [...prevLeaderboard, ...data.data]);
        setMeta(data.meta);
      } catch (error) {
        console.error("Error fetching Leaderboard:", error);
      }
    };
    showMore();
  };

  const handlePage = (page) => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          `${api}/leaderboards/${quizId}?page=${page}&limit=${meta.pageSize}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }
        const data = await response.json();
        setLeaderboard(data.data);
        setMeta(data.meta);
      } catch (error) {
        console.error("Error fetching Leaderboard:", error);
      }
    };
    fetchPage();
  };

  return (
    <div className="flex flex-col justify-center mt-5">
      <table className="table-auto border-collapse border border-gray-300 shadow-sm w-full">
        <thead>
          <tr className="bg-indigo-100 text-indigo-800 font-semibold">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Score</th>
            <th className="border border-gray-300 px-4 py-2">Score %</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-indigo-50`}
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {entry.rowNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {entry.username}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {entry.score}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {entry.scorePercentage}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(entry.dateOfScore).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col w-full mt-5 justify-center items-center space-y-2">
        <button
          onClick={handleShowMore}
          className={`bg-blue-900 text-white rounded-xl text-base w-fit h-fit p-3 grid grid-rows-auto place-content-center shadow-md ${
            meta.currentPage >= meta.totalPages &&
            "opacity-50 cursor-not-allowed"
          } `}
          disabled={meta.currentPage >= meta.totalPages}
        >
          <span className="flex flex-row space-x-1">
            <span>Show More</span>
          </span>
        </button>
        <div>
          <div className="flex flex-row space-x-2">
            {Array.from(
              { length: meta.totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePage(page)}
                className={` text-white rounded-xl text-base w-fit h-fit p-3 grid grid-rows-auto place-content-center shadow-md ${
                  page === meta.currentPage ? "bg-blue-900" : "bg-blue-500"
                }`}
              >
                <span className="space-x-1">
                  <span>{page}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

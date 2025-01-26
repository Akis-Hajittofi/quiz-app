import { Request, Response } from "express";
import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface Leaderboard {
  QuizID: number;
  Username: string;
  Score: number;
  ScorePercentage: number;
}

type RequestBody<T> = Request<{}, {}, T>;

//  POST quiz score to the leaderboard
export const postLeaderboard = async (
  req: RequestBody<Leaderboard>,
  res: Response
) => {
  const { QuizID, Username, Score, ScorePercentage } = req.body;

  if (
    !QuizID ||
    !Username ||
    typeof Score !== "number" ||
    typeof ScorePercentage !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO leaderboards (QuizID, Username, Score, ScorePercentage) VALUES (?, ?, ?, ?)",
      [QuizID, Username, Score, ScorePercentage]
    );

    res.status(201).json({
      message: "Score added to leaderboard successfully",
      data: {
        ScoreID: result.insertId,
        QuizID,
        Username,
        Score,
        ScorePercentage,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all leaderboards
export const getAllLeaderboards = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM leaderboards");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET leaderboard by Quiz ID
export const getLeaderboardByQuizID = async (req: Request, res: Response) => {
  const { QuizID } = req.params;

  try {
    const [leaderboard] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM leaderboards WHERE QuizID = ? ORDER BY ScorePercentage DESC",
      [QuizID]
    );

    if (leaderboard.length === 0) {
      return res.status(404).json({ error: "Leaderboard not found" });
    }
    res.json(leaderboard);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

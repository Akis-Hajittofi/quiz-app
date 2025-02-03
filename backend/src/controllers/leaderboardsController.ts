import { Request, Response } from "express";
import pool from "../db";
import { ResultSetHeader, RowDataPacket, FieldPacket } from "mysql2";
import { LeaderboardEntry } from "../middlewares/validateLeaderboard";

type RequestBody<T> = Request<{}, {}, T>;

const mapToDbLeaderboard = (entry: LeaderboardEntry) => ({
  QuizID: entry.quizId,
  Username: entry.username,
  Score: entry.score,
  ScorePercentage: entry.scorePercentage,
});

// Define an interface for a quiz row that extends RowDataPacket
interface QuizRow extends RowDataPacket {
  id: number;
}

const quizExists = async (quizId: number): Promise<boolean> => {
  const [rows] = await pool.query<QuizRow[]>(
    "SELECT * FROM quizzes WHERE QuizID = ? LIMIT 1",
    [quizId]
  );
  return rows.length > 0;
};

//  POST quiz score to the leaderboard
export const postLeaderboard = async (
  req: RequestBody<LeaderboardEntry>,
  res: Response
): Promise<Response> => {
  const { quizId, username, score, scorePercentage } = req.body;

  // Mapping for maintainability later on but it's not actually needed right now
  const dbEntry = mapToDbLeaderboard({
    quizId,
    username,
    score,
    scorePercentage,
  });

  if (!(await quizExists(quizId))) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO leaderboards (QuizID, Username, Score, ScorePercentage) VALUES (?, ?, ?, ?)",
      [dbEntry.QuizID, dbEntry.Username, dbEntry.Score, dbEntry.ScorePercentage]
    );

    return res.status(201).json({
      message: "Score added to leaderboard successfully",
      data: {
        scoreId: result.insertId,
        quizId,
        username,
        score,
        scorePercentage,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
  const { page, limit } = req.query;

  // Convert query params to numbers
  const pageNumber = parseInt(page as string, 10) || 1;
  const pageLimit = parseInt(limit as string, 10) || 10;

  if (pageNumber <= 0 || pageLimit <= 0) {
    return res.status(400).json({ error: "Invalid page or limit." });
  }

  try {
    const [totalRowsResult] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM leaderboards WHERE QuizID = ?",
      [QuizID]
    );
    const totalRows = totalRowsResult[0].total;

    if (totalRows === 0) {
      return res.status(404).json({ error: "Leaderboard not found." });
    }

    const totalPages = Math.ceil(totalRows / pageLimit);

    if (pageNumber > totalPages) {
      return res.status(404).json({ error: "Page invalid." });
    }

    const offset = (pageNumber - 1) * pageLimit;

    const [leaderboard] = await pool.query<RowDataPacket[]>(
      `
      SELECT 
          ROW_NUMBER() OVER (ORDER BY ScorePercentage DESC) AS RowNumber,
          Username,
          Score,
          ScorePercentage,
          DateOfScore
      FROM leaderboards
      WHERE QuizID = ?
      ORDER BY ScorePercentage DESC
      LIMIT ? OFFSET ?
      `,
      [QuizID, pageLimit, offset]
    );

    res.json({
      data: leaderboard,
      meta: {
        currentPage: pageNumber,
        pageSize: pageLimit,
        totalRows,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

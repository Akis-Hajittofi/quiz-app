import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./db";
import cors from "cors";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import Decimal from "decimal.js";

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.use(express.json());

const port: number = parseInt(process.env.PORT || "3000", 10);

app.get("/", (req: Request, res: Response) => {
  res.send("THE Express + TypeScript Server");
});

// GET all quizzes, includes ALL columns, used on home page
app.get("/quizzes", async (req: Request, res: Response) => {
  try {
    // Query the database
    const [rows] = await pool.query("SELECT * FROM quizzes");
    res.json(rows); // Send the query result as JSON
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Find quiz by name
app.get("/quizzes/:Name", async (req: Request, res: Response) => {
  let { Name } = req.params;
  Name = Name.replace(/-/g, " ");

  try {
    const [foundQuiz] = await pool.query<RowDataPacket[]>(
      "SELECT QuizID, Name, TimeLimitSeconds FROM quizzes WHERE Name = ?",
      [Name]
    );

    if (foundQuiz.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json(foundQuiz[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET answers for a quiz
app.get("/answers/:QuizID", async (req: Request, res: Response) => {
  const { QuizID } = req.params;
  try {
    const [foundAnswers] = await pool.query<RowDataPacket[]>(
      "SELECT Answer FROM answers WHERE QuizID = ?",
      [QuizID]
    );

    if (foundAnswers.length === 0) {
      return res.status(404).json({ error: "Answers not found" });
    }

    res.status(200).json(foundAnswers);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

interface Leaderboard {
  QuizID: number;
  Username: string;
  Score: number;
  ScorePercentage: number;
}

type RequestBody<T> = Request<{}, {}, T>;

//  POST quiz score to the leaderboard
app.post(
  "/leaderboards",
  async (req: RequestBody<Leaderboard>, res: Response) => {
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
  }
);

// GET leaderboard by Quiz ID
app.get("/leaderboards/:QuizID", async (req: Request, res: Response) => {
  const { QuizID } = req.params;

  try {
    const [leaderboard] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM leaderboards WHERE QuizID = ? ORDER BY ScorePercentage ASC",
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
});

// GET All leaderboards
app.get("/leaderboards", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM leaderboards");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

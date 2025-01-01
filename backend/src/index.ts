import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./db";
import cors from "cors";
import { RowDataPacket } from "mysql2";

dotenv.config();
const app: express.Application = express();
app.use(cors());
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

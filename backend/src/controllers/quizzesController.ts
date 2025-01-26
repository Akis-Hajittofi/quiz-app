import { Request, Response } from "express";
import pool from "../db";
import { RowDataPacket } from "mysql2";

//  GET all quizzes
export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    // Query the database
    const [rows] = await pool.query("SELECT * FROM quizzes");
    res.json(rows); // Send the query result as JSON
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET quiz by name
export const getQuizByName = async (req: Request, res: Response) => {
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
};

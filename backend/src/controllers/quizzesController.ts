import { Request, Response } from "express";
import pool from "../db";
import { RowDataPacket } from "mysql2";

//  GET all quizzes
export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        QuizID AS quizId,
        Name AS name,
        Subheading AS subheading,
        ImageUrl AS imageUrl,
        TimeLimitSeconds AS timeLimitSeconds
      FROM quizzes`);
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET quiz by name
export const getQuizByName = async (req: Request, res: Response) => {
  let { name } = req.params;
  name = name.replace(/-/g, " ");

  try {
    const [foundQuiz] = await pool.query<RowDataPacket[]>(
      `
      SELECT 
        QuizID AS quizId,
        Name AS name,
        TimeLimitSeconds AS timeLimitSeconds
      FROM quizzes
      WHERE Name = ?`,
      [name]
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

import { Request, Response } from "express";
import pool from "../db";
import { RowDataPacket } from "mysql2";

// GET answers for a quiz
export const getAnswersByQuizID = async (req: Request, res: Response) => {
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
};

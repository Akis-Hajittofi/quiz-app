import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("THE Express + TypeScript Server");
});

app.get("/quizzes", async (req: Request, res: Response) => {
  try {
    // Query the database
    const [rows] = await pool.query("SELECT * FROM quizes");

    res.json(rows); // Send the query result as JSON
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

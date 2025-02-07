import cors from "cors";
import express from "express";
import baseRoutes from "./routes/baseRoutes";
import quizzesRoutes from "./routes/quizzesRoutes";
import answersRoutes from "./routes/answersRoutes";
import leaderboardsRoutes from "./routes/leaderboardsRoutes";
import { clerkMiddleware } from "@clerk/express";

const app: express.Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/", baseRoutes);
app.use("/quizzes", quizzesRoutes);
app.use("/answers", answersRoutes);
app.use("/leaderboards", leaderboardsRoutes);

export default app;

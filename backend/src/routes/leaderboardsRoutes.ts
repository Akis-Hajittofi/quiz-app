import { Router } from "express";
import {
  getAllLeaderboards,
  getLeaderboardByQuizID,
  getLeaderboardsByUserId,
  postLeaderboard,
} from "../controllers/leaderboardsController";
import { validateLeaderboardEntry } from "../middlewares/validateLeaderboard";
import { requireAuth } from "@clerk/express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, validateLeaderboardEntry, postLeaderboard);
router.get("/", getAllLeaderboards);
router.get("/:quizId", getLeaderboardByQuizID);
router.get("/:UserId", getLeaderboardsByUserId);

export default router;

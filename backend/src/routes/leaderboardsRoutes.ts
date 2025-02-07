import { Router } from "express";
import {
  getAllLeaderboards,
  getLeaderboardByQuizID,
  postLeaderboard,
} from "../controllers/leaderboardsController";
import { validateLeaderboardEntry } from "../middlewares/validateLeaderboard";
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/", requireAuth(), validateLeaderboardEntry, postLeaderboard);
router.get("/", getAllLeaderboards);
router.get("/:quizId", getLeaderboardByQuizID);

export default router;

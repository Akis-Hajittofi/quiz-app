import { Router } from "express";
import {
  getAllLeaderboards,
  getLeaderboardByQuizID,
  postLeaderboard,
} from "../controllers/leaderboardsController";
import { validateLeaderboardEntry } from "../middlewares/validateLeaderboard";

const router = Router();

router.post("/", validateLeaderboardEntry, postLeaderboard);
router.get("/", getAllLeaderboards);
router.get("/:quizId", getLeaderboardByQuizID);

export default router;

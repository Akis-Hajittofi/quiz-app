import { Router } from "express";
import {
  getAllLeaderboards,
  getLeaderboardByQuizID,
  postLeaderboard,
} from "../controllers/leaderboardsController";

const router = Router();

router.post("/", postLeaderboard);
router.get("/", getAllLeaderboards);
router.get("/:QuizID", getLeaderboardByQuizID);

export default router;

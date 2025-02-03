import { Router } from "express";
import { getAnswersByQuizID } from "../controllers/answersController";

const router = Router();

router.get("/:quizId", getAnswersByQuizID);

export default router;

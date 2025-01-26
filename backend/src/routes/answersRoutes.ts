import { Router } from "express";
import { getAnswersByQuizID } from "../controllers/answersController";

const router = Router();

router.get("/:QuizID", getAnswersByQuizID);

export default router;

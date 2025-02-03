import { Router } from "express";
import { getAllQuizzes, getQuizByName } from "../controllers/quizzesController";

const router = Router();

router.get("/", getAllQuizzes);
router.get("/:name", getQuizByName);

export default router;

import { Router } from "express";
import { registerUser } from "../controllers/user.js";

const router = Router();

router.post("/", registerUser);

export default router;

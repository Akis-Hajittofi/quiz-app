import { Router } from "express";
import { itWorks } from "../controllers/auth.js";

const router = Router();

router.get("/login", itWorks);

export default router;

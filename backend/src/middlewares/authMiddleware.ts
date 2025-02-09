import { requireAuth } from "@clerk/express";
import { NextFunction, Response } from "express";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../types/authTypes";
dotenv.config();
  
export const authMiddleware = (
 req: AuthenticatedRequest,
 res: Response,
 next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    // Allow a mock userId to be sent via body
    const devUserId = req.query.devUserId as string;
    if (devUserId) {
      req.auth = { userId: devUserId };
      console.log(`[AUTH] Development mode: Mocking userId as "${devUserId}"`);

      return next();
    }
    console.log(
      "[AUTH] Development mode: No devUserId provided, requiring Clerk authentication."
    );
  }
  if (process.env.NODE_ENV === "production") {
    console.log("[AUTH] Production mode: Enforcing Clerk authentication.");
  }

  return requireAuth()(req, res, next);
};
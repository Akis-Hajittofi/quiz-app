import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Define the Zod schema
export const leaderboardEntrySchema = z.object({
  quizId: z.number(),
  username: z.string(),
  score: z.number(),
  scorePercentage: z.number(),
});

export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;

// Validate the request body with Zod
export const validateLeaderboardEntry = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = leaderboardEntrySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }
  // Replace req.body with the validated data to ensure type safety
  req.body = result.data;
  next();
};

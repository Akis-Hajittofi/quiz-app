// import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/", authRouter);
app.use("/users", userRouter);

// Catch-all route that will be triggered if no other route is matched
app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: {
      resource: "Not found",
    },
  });
});

export default app;

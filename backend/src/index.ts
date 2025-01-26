import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port: number = parseInt(process.env.PORT || "3000", 10);

app.listen(port, "0.0.0.0", () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

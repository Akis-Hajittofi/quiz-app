import "dotenv/config";
import app from "./server.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`\n Server is running on port ${port}\n`);
});

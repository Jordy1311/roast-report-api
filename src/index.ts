import dotenv from "dotenv";

import connectToDB from "./db";
import app from "./app";

dotenv.config();

connectToDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]  Server is running at http://localhost:${port}`);
});

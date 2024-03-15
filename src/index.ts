import dotenv from 'dotenv';

import connectDB from './db';
import app from './app';

dotenv.config();

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]  Server is running at http://localhost:${port}`);
});

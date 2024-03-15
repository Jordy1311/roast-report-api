import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import connectDB from './db';
import usersRouter from './routes/users';
import authRoute from './routes/auth';

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/login', authRoute);
app.use('/users', usersRouter);

app.get(['/', '/health', '/status'], (_: Request, res: Response) => {
  res.status(200).send({ server: 'OK' });
});

app.listen(port, () => {
  console.log(`[server]  Server is running at http://localhost:${port}`);
});

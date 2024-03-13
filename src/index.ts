import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import usersRouter from './routes/users';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (_: Request, res: Response) => {
  res.status(200).send({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`[server]  Server is running at http://localhost:${port}`);
});

import express, { Express, Request, Response } from 'express';

import usersRouter from './routes/users';
import authRouter from './routes/auth';

const app: Express = express();

app.use(express.json());
app.use('/login', authRouter);
app.use('/users', usersRouter);

app.get(
  [ '/', '/health', '/status' ],
  function (_: Request, res: Response) {
    res.status(200).send({ server: 'OK' });
  }
);

export default app;

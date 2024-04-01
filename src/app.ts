import express, { Express, Request, Response } from 'express';

import authRouter from './routes/auth';
import roastsRouter from './routes/roasts';
import usersRouter from './routes/users';

const app: Express = express();

app.use(express.json());
app.use('/v1/login', authRouter);
app.use('/v1/roasts', roastsRouter);
app.use('/v1/users', usersRouter);

app.get(
  [ '/', '/health', '/status' ],
  function (_: Request, res: Response) {
    res.status(200).send({ server: 'OK' });
  }
);

export default app;

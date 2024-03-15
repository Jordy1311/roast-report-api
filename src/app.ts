import express, { Express, Request, Response } from 'express';

import usersRouter from './routes/users';
import authRoute from './routes/auth';

const app: Express = express();

app.use(express.json());
app.use('/login', authRoute);
app.use('/users', usersRouter);

app.get([ '/', '/health', '/status' ], (_: Request, res: Response) => {
  res.status(200).send({ server: 'OK' });
});

export default app;

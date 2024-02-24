import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import usersRouter from './routes/users';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi there!!');
});

app.listen(port, () => {
  console.log(`[server]  Server is running at http://localhost:${port}`);
});

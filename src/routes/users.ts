import express, { Router, Request, Response } from 'express';
import moment from 'moment';

import { hasRequiredProperties } from '../utils';
import { User, UserCreateData } from '../types/user';

const router: Router = express.Router();

const users: User[] = [];

router.post('/create', (req: Request<UserCreateData>, res: Response) => {
  if (!hasRequiredProperties(['name.first', 'name.last', 'email'], req)) {
    res.sendStatus(400);
  }

  const newUser: User = {
    id: Math.random().toString(32).substring(2, 15),
    name: {
      first: req.body.name.first,
      last: req.body.name.last,
    },
    email: req.body.email,
    createdAt: moment(),
  }

  users.push(newUser);

  res.status(201).send(newUser);
});

// GET USER BY ID?

router.get('/', (_, res: Response) => {
  res.send(users);
});

router.patch('/:userId', (req: Request, res: Response) => {

});

router.delete('/:userId', (req: Request, res: Response) => {

});

export default router;

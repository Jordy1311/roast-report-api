import express, { Router, Request, Response } from 'express';
const bcrypt = require('bcrypt');

import User from '../models/User';

const router: Router = express.Router();

// PATH:
// localhost:3000/users

router.post('/', async (req: Request, res: Response) => {
  const { email, password: unHashedPassword } = req.body;

  const hashedPassword = await bcrypt.hash(unHashedPassword, 10);

  try {
    const newUser = await User.create({ email, password: hashedPassword });
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
});

router.get('/', async (_: Request, res: Response) => {
  const users = await User.find({}, null, { limit: 10, lean: true });
  res.send(users);
});

export default router;

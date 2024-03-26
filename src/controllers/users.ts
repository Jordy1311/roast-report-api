import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

import User from '../models/User';

export async function createUser(req: Request, res: Response) {
  const { email, password: unHashedPassword } = req.body;

  const hashedPassword = await bcrypt.hash(unHashedPassword, 10);

  try {
    const newUser = await User.create(
      { email, password: hashedPassword }
    );
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
}

export async function getUser(req: Request, res: Response) {
  const user = await User.findOne(
    { email: req.user!.email }
  ).lean();

  res.send(user);
}

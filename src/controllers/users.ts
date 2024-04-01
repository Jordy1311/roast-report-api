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
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getUser(req: Request, res: Response) {
  const user = await User.findOne({ _id: req.user!.id }).lean();
  return res.send(user);
}

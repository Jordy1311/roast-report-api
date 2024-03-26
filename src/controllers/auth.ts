import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

import User, { UserTokenPayload } from '../models/User';

export async function login(req: Request, res: Response) {
  const { email, password: unHashedPassword } = req.body;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(401).send('Unable to find user');
    }

    const passwordIsCorrect = await bcrypt.compare(
      unHashedPassword,
      user!.password
    );

    if (passwordIsCorrect) {
      const tokenPayload: UserTokenPayload = {
        email: user.email
      };

      const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.json({ accessToken });
    } else {
      return res.status(401).send('Login failed');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(
      { message: 'Server Error', error: err }
    );
  }
}

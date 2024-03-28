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
        // TODO: unsure why I have to .toString here
        id: user._id.toString(),
        email: user.email
      };

      const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.status(200).json(accessToken);
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

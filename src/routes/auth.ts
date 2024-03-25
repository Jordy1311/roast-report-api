import express, { Router, Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

import User, { UserTokenPayload } from '../models/User';

const router: Router = express.Router();

// PATH:
// localhost:3000/login

router.post('/', async (req: Request, res: Response) => {
  const { email, password: unHashedPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('Unable to find user');
    }

    const passwordIsCorrect = await bcrypt.compare(
      unHashedPassword,
      user?.password
    );

    if (passwordIsCorrect) {
      const tokenPayload: UserTokenPayload = { email: user.email };
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
    return res.status(500).json({ message: 'Server Error', error: err });
  }
});

export default router;

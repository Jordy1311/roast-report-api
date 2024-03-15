import express, { Router, Request, Response } from 'express';
const bcrypt = require('bcrypt');

import User from '../models/User';

const router: Router = express.Router();

// PATH / URL
// localhost:3000/login

router.post('/', async (req: Request, res: Response) => {
  const { email, password: unHashedPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send('Unable to find user');
    }

    const isPasswordCorrect = await bcrypt.compare(
      unHashedPassword,
      user?.password
    );

    if (isPasswordCorrect) {
      res.send('Login successful');
    } else {
      res.status(401).send('Loging failed');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
});

export default router;

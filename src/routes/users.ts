import express, { Router, Request, Response } from 'express';

import User from '../models/User';

const router: Router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = new User({ email });
    const newUser = await user.save();

    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
});

// ADD GET USER BY ID?

router.get('/', async (_: Request, res: Response) => {
  const users = await User.find({}, null, { limit: 10, lean: true });
  res.send(users);
});

// router.patch('/:userId', (req: Request, res: Response) => {

// });

// router.delete('/:userId', (req: Request, res: Response) => {

// });

export default router;

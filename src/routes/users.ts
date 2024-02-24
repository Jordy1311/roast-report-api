import express, { Router, Request, Response } from "express";
import moment from 'moment';

const router: Router = express.Router();

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  createdAt: Date;
}

const users: User[] = [];

router.post('/', (req: Request, res: Response) => {

});

// GET USER BY ID?

router.get('/', (_, res: Response) => {
  res.send('This is GET /users!!');
});

router.patch('/:userId', (req: Request, res: Response) => {

});

router.delete('/:userId', (req: Request, res: Response) => {

});

export default router;

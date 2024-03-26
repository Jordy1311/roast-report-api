import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

import { UserTokenPayload } from '../models/User';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: unknown, user: UserTokenPayload) => {
      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    }
  );
}

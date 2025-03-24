import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

import User, { UserTokenPayload } from "../models/User";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: unknown, userToken: UserTokenPayload) => {
      if (err) return res.sendStatus(401);

      const actualUser = await User.findOne(
        { _id: userToken.id }, { _id: 1 }
      ).lean();

      if (!actualUser) return res.sendStatus(401);

      req.user = userToken;

      next();
    },
  );
}

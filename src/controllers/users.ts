import { Request, Response } from "express";

import User from "../models/User";

export async function getUser(req: Request, res: Response) {
  const user = await User.findOne({ _id: req.user!.id }).lean();
  return res.send(user);
}

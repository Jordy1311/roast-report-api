import express, { Router } from "express";

import { isLoggedIn } from "../middlewares/authMiddleware";
import { getUser } from "../controllers/users";

const router: Router = express.Router();

// PATH: localhost:3000/v1/users

router.get("/", isLoggedIn, getUser);

export default router;

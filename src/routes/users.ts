import express, { Router } from "express";

import { isLoggedIn } from "../middlewares/authMiddleware";
import { createUser, getUser } from "../controllers/users";

const router: Router = express.Router();

// PATH: localhost:3000/v1/users

router.post("/", createUser);
router.get("/", isLoggedIn, getUser);

export default router;

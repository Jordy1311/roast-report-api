import express, { Router } from "express";

import { requestLogin, confirmLogin } from "../controllers/auth";

const router: Router = express.Router();

// PATH:
// localhost:3000/v1/login

router.post("/", requestLogin);
router.post("/confirm/:confirmationCode", confirmLogin);

export default router;

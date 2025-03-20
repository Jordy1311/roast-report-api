import express, { Router } from "express";

import { isLoggedIn } from "../middlewares/authMiddleware";
import {
  createRoast,
  deleteRoast,
  getDistinctRoasters,
  getUsersRoasts,
  updateRoast,
} from "../controllers/roasts";

const router: Router = express.Router();

// PATH: localhost:3000/v1/roasts

router.post("/", isLoggedIn, createRoast);
router.get("/", isLoggedIn, getUsersRoasts);
router.patch("/:id", isLoggedIn, updateRoast);
router.delete("/:id", isLoggedIn, deleteRoast);

router.get("/roasters", isLoggedIn, getDistinctRoasters);

export default router;

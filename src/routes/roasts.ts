import express, { Router } from 'express';

import { isLoggedIn } from '../middlewares/authMiddleware';
import { createRoast, getUsersRoasts } from '../controllers/roasts';

const router: Router = express.Router();

// PATH:
// localhost:3000/roasts

router.post('/', isLoggedIn, createRoast);
router.get('/', isLoggedIn, getUsersRoasts);

export default router;

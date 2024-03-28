import express, { Router } from 'express';

import { isLoggedIn } from '../middlewares/authMiddleware';
import { createRoast } from '../controllers/roasts';

const router: Router = express.Router();

// PATH:
// localhost:3000/roasts

router.post('/', isLoggedIn, createRoast);

export default router;

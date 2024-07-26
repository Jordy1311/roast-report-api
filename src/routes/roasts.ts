import express, { Router } from 'express';

import { isLoggedIn } from '../middlewares/authMiddleware';
import { createRoast, deleteRoast, getUsersRoasts, updateRoast } from '../controllers/roasts';

const router: Router = express.Router();

// PATH:
// localhost:3000/roasts

router.post('/', isLoggedIn, createRoast);
router.get('/', isLoggedIn, getUsersRoasts);
router.patch('/:id', isLoggedIn, updateRoast);
router.delete('/:id', isLoggedIn, deleteRoast);

export default router;

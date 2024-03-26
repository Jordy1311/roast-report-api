import express, { Router } from 'express';

import { login } from '../controllers/auth';

const router: Router = express.Router();

// PATH:
// localhost:3000/login

router.post('/', login);

export default router;

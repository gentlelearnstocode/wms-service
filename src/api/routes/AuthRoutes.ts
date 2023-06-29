import { Router } from 'express';
import { signInUser } from '../controllers/auth.controller';

const router = Router();
router.post('/signin', signInUser);

export default router;

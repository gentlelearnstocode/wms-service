import { Router } from 'express';
import { signInUser } from '../controllers/auth.controller';

const router = Router();
const api = '/auth';

router.post(`${api}/signin`, signInUser);

export default router;

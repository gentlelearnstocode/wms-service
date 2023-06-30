import { Router } from 'express';
import { signInUser } from './auth.controller';
import { configService } from '../../configs';

const router = Router();
const api = configService.AUTH_API;

router.post(`${api}/signin`, signInUser);

export default router;

import { deleteUser, getAllUsers, getUser, upsert } from './user.controller';
import { Router } from 'express';
import { configService } from '../../configs';

const router = Router();
const api = configService.USER_API;

router.get(`${api}`, getAllUsers).get(`${api}/:id`, getUser);
router.post(`${api}/create-user`, upsert);
router.delete(`${api}/:id`, deleteUser);
export default router;

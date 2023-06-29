import { createUser, deleteUser, getAllUsers, getUser } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();
const api = '/users';

router.get(`${api}`, getAllUsers).get(`${api}/:id`, getUser);
router.post(`${api}/create-user`, createUser);
router.delete(`${api}/:id`, deleteUser);
export default router;

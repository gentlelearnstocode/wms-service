import { createUser, deleteUser, getAllUsers, getUser } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllUsers).get('/:id', getUser);
router.post('/create-user', createUser);
router.delete('/:id', deleteUser);
export default router;

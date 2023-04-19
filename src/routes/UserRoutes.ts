import { Router } from 'express';

import {
  getAllUsers,
  getUser,
  createUser,
} from '../controllers/UserController';

const UserRoutes = Router();

UserRoutes.route('/').get(getAllUsers);
UserRoutes.route('/create-user').post(createUser);
UserRoutes.route('/:id').get(getUser);

export default UserRoutes;

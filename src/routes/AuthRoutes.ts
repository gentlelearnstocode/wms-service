import { Router } from 'express';

import { signInUser } from '../controllers/AuthController';

const AuthRoutes = Router();

AuthRoutes.route('/signin').post(signInUser);

export default AuthRoutes;

import { configService } from '../configs';
import { signInUser } from '../controllers/auth.controller';

configService.router.route('/signin').post(signInUser)

export default configService.router

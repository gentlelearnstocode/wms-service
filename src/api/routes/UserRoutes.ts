import {
  getAllUsers,
  getUser,
  createUser,
} from '../controllers/user.controller';
import { configService } from '../../configs';

configService.routeGETRequest('/', [getAllUsers])
configService.routePOSTRequest('/create-user', [createUser])
configService.routeGETRequest('/:id', [getUser])

export default configService.router

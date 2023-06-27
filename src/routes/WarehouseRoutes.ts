import { configService } from '../configs';

import {
  getAllWarehouses,
  createWarehouse,
  getWarehouse,
} from '../controllers/warehouse.controller';
import { verifyToken } from '../middlewares';

configService.routeGETRequest('/', [verifyToken, getAllWarehouses])
configService.routeGETRequest('/:id', [getWarehouse])
configService.routePOSTRequest('/create-warehouse', [verifyToken, createWarehouse])

export default configService.router

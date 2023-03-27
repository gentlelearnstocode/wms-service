import { Router } from 'express';

import {
  getAllWarehouses,
  createWarehouse,
  getWarehouse,
} from '../controllers/WarehouseController';

const WarehouseRoutes = Router();

WarehouseRoutes.route('/').get(getAllWarehouses);
WarehouseRoutes.route('/:id').get(getWarehouse);
WarehouseRoutes.route('/create-warehouse').post(createWarehouse);

export default WarehouseRoutes;

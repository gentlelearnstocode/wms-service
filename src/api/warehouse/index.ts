import { deleteWarehouse, getAllWarehouses, getWarehouse, upsert } from './warehouse.controller';
import { verifyToken } from '../../middlewares';
import { Router } from 'express';
import { configService } from '../../configs';

const router = Router();
const api = configService.WAREHOUSE_API;

router.get(`${api}`, verifyToken, getAllWarehouses).get(`${api}/:id`, getWarehouse);
router.post(`${api}/create-warehouse`, verifyToken, upsert);
router.delete('/:id', deleteWarehouse);

export default router;

import { createWarehouse, deleteWarehouse, getAllWarehouses, getWarehouse } from '../controllers/warehouse.controller';
import { verifyToken } from '../../middlewares';
import { Router } from 'express';

const router = Router();
const api = '/warehouses';

router.get(`${api}`, verifyToken, getAllWarehouses).get(`${api}/:id`, getWarehouse);
router.post(`${api}/create-warehouse`, verifyToken, createWarehouse);
router.delete('/:id', deleteWarehouse);

export default router;

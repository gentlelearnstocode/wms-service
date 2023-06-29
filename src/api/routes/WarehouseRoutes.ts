import { createWarehouse, deleteWarehouse, getAllWarehouses, getWarehouse } from '../controllers/warehouse.controller';
import { verifyToken } from '../../middlewares';
import { Router } from 'express';

const router = Router();

router.get('/', verifyToken, getAllWarehouses).get('/:id', getWarehouse);
router.post('/create-warehouse', verifyToken, createWarehouse);
router.delete('/:id', deleteWarehouse);

export default router;

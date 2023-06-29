import {
  createSalesOrder,
  deleteSalesOrder,
  getAllSalesOrders,
  getSalesOrder,
} from '../controllers/sales-order.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllSalesOrders).get('/:id', getSalesOrder);
router.post('/create-salesorder', createSalesOrder);
router.delete('/:id', deleteSalesOrder);

export default router;

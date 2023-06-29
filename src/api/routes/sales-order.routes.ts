import {
  createSalesOrder,
  deleteSalesOrder,
  getAllSalesOrders,
  getSalesOrder,
} from '../controllers/sales-order.controller';
import { Router } from 'express';

const router = Router();
const api = '/sales-orders';

router.get(`${api}/`, getAllSalesOrders).get(`${api}/:id`, getSalesOrder);
router.post(`${api}/create-salesorder`, createSalesOrder);
router.delete(`${api}/:id`, deleteSalesOrder);

export default router;

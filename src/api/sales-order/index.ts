import { deleteSalesOrder, getAllSalesOrders, getSalesOrder, upsert } from './sales-order.controller';
import { Router } from 'express';
import { configService } from '../../configs';

const router = Router();
const api = configService.SALESORDER_API;

router.get(`${api}/`, getAllSalesOrders).get(`${api}/:id`, getSalesOrder);
router.post(`${api}/create-salesorder`, upsert);
router.delete(`${api}/:id`, deleteSalesOrder);

export default router;

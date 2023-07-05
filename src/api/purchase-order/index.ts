import { deletePurchaseOrder, getAllPurchaseOrders, getPurchaseOrder, upsert } from './purchase-order.controller';
import { Router } from 'express';
import { configService } from '../../configs';

const router = Router();
const api = configService.PURCHASEORDER_API;

router.get(`${api}/`, getAllPurchaseOrders).get(`${api}/:id`, getPurchaseOrder);
router.post(`${api}/create-purchaseorder`, upsert);
router.delete(`${api}/:id`, deletePurchaseOrder);

export default router;

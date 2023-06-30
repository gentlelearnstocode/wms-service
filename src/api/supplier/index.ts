import { Router } from 'express';
import { createSupplier, getAllSuppliers, getSupplier } from './supplier.controller';
import { configService } from '../../configs';

const router = Router();
const api = configService.SUPPLIER_API;

router.get(`${api}/`, getAllSuppliers).get(`${api}/:`, getSupplier);
router.post(`${api}/create-supplier`, createSupplier);

export default router;

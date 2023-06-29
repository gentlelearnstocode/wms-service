import { Router } from 'express';
import { createSupplier, getAllSuppliers, getSupplier } from '../controllers/supplier.controller';

const router = Router();
const api = '/suppliers';

router.get(`${api}/`, getAllSuppliers).get(`${api}/:`, getSupplier);
router.post(`${api}/create-supplier`, createSupplier);

export default router;

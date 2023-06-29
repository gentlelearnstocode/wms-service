import { Router } from 'express';
import { createSupplier, getAllSuppliers, getSupplier } from '../controllers/supplier.controller';

const router = Router();

router.get('/', getAllSuppliers).get('/:', getSupplier);
router.post('/create-supplier', createSupplier);

export default router;

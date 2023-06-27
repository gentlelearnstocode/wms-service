import { Router } from 'express';

import { createSupplier, getAllSuppliers, getSupplier } from '../controllers/supplier.controller';

const SupplierRoutes = Router();

SupplierRoutes.route('/').get(getAllSuppliers);
SupplierRoutes.route('/create-supplier').post(createSupplier);
SupplierRoutes.route('/:id').get(getSupplier);

export default SupplierRoutes;

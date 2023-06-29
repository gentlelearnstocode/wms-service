import { Router } from 'express';

import { createProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller';
import { verifyToken, authorizeRole } from '../../middlewares';
import UserRoles from '../../enums/UserRoles';

const ProductRoutes = Router();

ProductRoutes.route('/').get(verifyToken, getAllProducts);
ProductRoutes.route('/create-product').post(
  verifyToken,
  (req, res, next) => authorizeRole(req, res, next, [UserRoles.ADMIN, UserRoles.MANAGER]),
  createProduct,
);
ProductRoutes.route('/:id').get(getProduct);
ProductRoutes.route('/update-product/:id').patch(
  verifyToken,
  (req, res, next) => authorizeRole(req, res, next, [UserRoles.ADMIN, UserRoles.MANAGER]),
  updateProduct,
);



export default ProductRoutes;

import { Router } from 'express';

import { createProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller';
import { authorizeRole, verifyToken } from '../../middlewares';
import UserRoles from '../../enums/UserRoles';

const ProductRoutes = Router();
const api = '/products';

ProductRoutes.route(`${api}/`).get(verifyToken, getAllProducts);
ProductRoutes.route(`${api}/create-product`).post(
  verifyToken,
  (req, res, next) => authorizeRole(req, res, next, [UserRoles.ADMIN, UserRoles.MANAGER]),
  createProduct,
);
ProductRoutes.route(`${api}/:id`).get(getProduct);
ProductRoutes.route(`${api}/update-product/:id`).patch(
  verifyToken,
  (req, res, next) => authorizeRole(req, res, next, [UserRoles.ADMIN, UserRoles.MANAGER]),
  updateProduct,
);


export default ProductRoutes;

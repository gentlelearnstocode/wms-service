import { Router } from 'express';
import { createProduct, getAllProducts, getProduct, updateProduct } from './product.controller';
import { authorizeRole, verifyToken } from '../../middlewares';
import { UserRoles } from '../../constants/enums';
import { configService } from '../../configs';

const router = Router();
const api = configService.PRODUCT_API;

router.route(`${api}/`).get(verifyToken, getAllProducts);
router.route(`${api}/create-product`).post(
  verifyToken,
  (req, res, next) => authorizeRole(req, res, next, [UserRoles.ADMIN, UserRoles.MANAGER]),
  createProduct,
);
router.route(`${api}/:id`).get(getProduct);
router.route(`${api}/update-product/:id`).patch(
  verifyToken,
  (req, res, next) => authorizeRole(req, res, next, [UserRoles.ADMIN, UserRoles.MANAGER]),
  updateProduct,
);


export default router;

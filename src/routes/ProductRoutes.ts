import { Router } from 'express';

import {
  createProduct,
  getAllProducts,
  getProduct,
} from '../controllers/ProductController';

const ProductRoutes = Router();

ProductRoutes.route('/').get(getAllProducts);
ProductRoutes.route('/create-product').post(createProduct);
ProductRoutes.route('/:id').get(getProduct);

export default ProductRoutes;

import { WarehouseService } from './warehouse.service';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { SupplierService } from './supplier.service';
import { SalesOrderService } from './sales-order.service';

import {
  supplierRepository,
  userRepository,
  warehouseRepository,
  productRepository,
  salesOrderRepository,
} from '../repositories';

export const warehouseService = new WarehouseService(warehouseRepository);
export const userService = new UserService(userRepository);
export const productService = new ProductService(productRepository);
export const supplierService = new SupplierService(supplierRepository);
export const salesOrderService = new SalesOrderService(salesOrderRepository);

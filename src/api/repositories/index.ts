import { UserRepository } from './user.repository';
import { WarehouseRepository } from './warehouse.repository';
import { ProductRepository } from './product.repository';
import { SupplierRepository } from './supplier.repository';
import { SalesOrderRepository } from './sales-order.repository';

export const warehouseRepository = new WarehouseRepository();
export const userRepository = new UserRepository();
export const productRepository = new ProductRepository();
export const supplierRepository = new SupplierRepository();
export const salesOrderRepository = new SalesOrderRepository();

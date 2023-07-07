import { salesOrderRepository, SalesOrderRepository } from './sales-order.repository';
import { AppError, getIncrementValue } from '../../utils';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import { productService, ProductService } from '../product/product.service';
import mongoose from 'mongoose';
import { ISalesOrder, ISalesOrderProduct } from './interfaces/sales-order.interface';

export class SalesOrderService {
  private readonly inventoryService: InventoryService = inventoryService;
  private readonly productService: ProductService = productService;

  constructor(private readonly salesOrderRepository: SalesOrderRepository) {}

  public async findAll() {
    return this.salesOrderRepository.findAll();
  }

  public async findById(id: string) {
    return this.salesOrderRepository.findById(id);
  }

  public async upsert(data: ISalesOrder) {
    if (!data._id) {
      data._id = new mongoose.mongo.ObjectId().toString();
      const SONumber = await getIncrementValue('SONumber');
      data = {
        ...data,
        SONumber,
      };
    }
    const validProducts = await Promise.all(
      data.products.map((i: ISalesOrderProduct) => this.productService.findById(i.id)),
    );
    if (validProducts.includes(null)) throw new AppError('Bad request', 400);
    const salesOrder = this.salesOrderRepository.upsert(data);
    await Promise.all(
      data.products.map((product: ISalesOrderProduct) =>
        this.inventoryService.adjustOutgoingQuantity(product.id, product.orderQuantity),
      ),
    );
    return salesOrder;
  }

  public async delete(id: string) {
    return this.salesOrderRepository.delete(id);
  }
}

export const salesOrderService = new SalesOrderService(salesOrderRepository);

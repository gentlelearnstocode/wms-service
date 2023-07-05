import { salesOrderRepository, SalesOrderRepository } from './sales-order.repository';
import { getIncrementValue } from '../../utils';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import mongoose from 'mongoose';
import { ISalesOrder } from './interfaces/sales-order.interface';

export class SalesOrderService {
  private readonly inventoryService: InventoryService = inventoryService;

  constructor(private readonly salesOrderRepository: SalesOrderRepository) {
  }

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
    const salesOrder = this.salesOrderRepository.upsert(data);
    await Promise.all(data.products.map((product) => this.adjustInventory(product.id, product.orderQuantity)));
    return salesOrder;
  }

  public async delete(id: string) {
    return this.salesOrderRepository.delete(id);
  }

  private async adjustInventory(productId: string, quantity: number) {
    await this.inventoryService.findOneAndUpdate({ productId }, { $inc: { 'outgoingQuantity': quantity } });
  }
}

export const salesOrderService = new SalesOrderService(salesOrderRepository);
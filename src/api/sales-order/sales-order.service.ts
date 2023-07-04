import { salesOrderRepository, SalesOrderRepository } from './sales-order.repository';
import { getIncrementValue } from '../../utils';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import mongoose from 'mongoose';
import { ISalesOrder } from './interfaces/sales-order.interface';

export class SalesOrderService {
  private readonly getIncrementValue = getIncrementValue;
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
      const SONumber = await this.getIncrementValue('SONumber');
      data = {
        ...data,
        SONumber,
      };
    }
    return this.salesOrderRepository.upsert(data);
  }

  public async delete(id: string) {
    return this.salesOrderRepository.delete(id);
  }
}

export const salesOrderService = new SalesOrderService(salesOrderRepository);
import { purchaseOrderRepository, PurchaseOrderRepository } from './purchase-order.repository';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import { getIncrementValue } from '../../utils';
import { IPurchaseOrder } from './interfaces/purchase-order.interface';
import mongoose from 'mongoose';

export class PurchaseOrderService {
  private readonly inventoryService: InventoryService = inventoryService;

  constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {
  }

  public async findAll() {
    return this.purchaseOrderRepository.findAll();
  }

  public async findById(id: string) {
    return this.purchaseOrderRepository.findById(id);
  }

  public async upsert(data: IPurchaseOrder) {
    if (!data._id) {
      data._id = new mongoose.mongo.ObjectId().toString();
      const PONumber = await getIncrementValue('PONumber');
      data = {
        ...data,
        PONumber,
      };
    }
    const purchaseOrder = this.purchaseOrderRepository.upsert(data);
    await Promise.all(data.products.map((product) => this.adjustInventory(product.id, product.orderQuantity)));
    return purchaseOrder;
  }

  public async delete(id: string) {
    return this.purchaseOrderRepository.delete(id);
  }

  private async adjustInventory(productId: string, quantity: number) {
    await this.inventoryService.findOneAndUpdate({ productId }, { $inc: { 'incomingQuantity': quantity } });
  }
}

export const purchaseOrderService = new PurchaseOrderService(purchaseOrderRepository);
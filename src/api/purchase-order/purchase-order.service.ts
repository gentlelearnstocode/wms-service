import { purchaseOrderRepository, PurchaseOrderRepository } from './purchase-order.repository';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import { AppError, getIncrementValue } from '../../utils';
import { IPurchaseOrder } from './interfaces/purchase-order.interface';
import mongoose from 'mongoose';
import { ISalesOrderProduct } from '../sales-order/interfaces/sales-order.interface';
import { productService, ProductService } from '../product/product.service';

export class PurchaseOrderService {
  private readonly inventoryService: InventoryService = inventoryService;
  private readonly productService: ProductService = productService;

  constructor(private readonly purchaseOrderRepository: PurchaseOrderRepository) {}

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
    const validProducts = await Promise.all(
      data.products.map((i: ISalesOrderProduct) => this.productService.findById(i.id)),
    );
    if (validProducts.includes(null)) throw new AppError('Bad request', 400);
    const purchaseOrder = this.purchaseOrderRepository.upsert(data);
    await Promise.all(
      data.products.map((product) =>
        this.inventoryService.adjustIncomingQuantity(product.id, product.orderQuantity),
      ),
    );
    return purchaseOrder;
  }

  public async delete(id: string) {
    return this.purchaseOrderRepository.delete(id);
  }
}

export const purchaseOrderService = new PurchaseOrderService(purchaseOrderRepository);

import { purchaseOrderRepository, PurchaseOrderRepository } from './purchase-order.repository';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import { AppError, getIncrementValue } from '../../utils';
import { IPurchaseOrder, IPurchaseOrderProduct } from './interfaces/purchase-order.interface';
import mongoose from 'mongoose';
import { ISalesOrderProduct } from '../sales-order/interfaces/sales-order.interface';
import { productService, ProductService } from '../product/product.service';
import { PurchaseOrderEntity } from './purchase-order.entity';
import { POStatus } from '../../constants/enums';

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
    const entity = new PurchaseOrderEntity(data).upsert();
    await this.productService.validateProducts(data.products);
    const purchaseOrder = this.purchaseOrderRepository.upsert(entity);
    await Promise.all(
      data.products.map((product) =>
        this.inventoryService.adjustIncomingQuantity(product.id, product.orderQuantity),
      ),
    );
    return purchaseOrder;
  }

  public async receivePurchaseOrder(id: string) {
    const purchaseOrder = await purchaseOrderRepository.findById(id);
    if (purchaseOrder && purchaseOrder.status === POStatus.PENDING) {
      const entity = new PurchaseOrderEntity(purchaseOrder).receive();
      this.productService.validateProducts(entity.products);
      await Promise.all(
        entity.products.map((product: IPurchaseOrderProduct) => {
          this.inventoryService.adjustStockQuantity(product.id, product.orderQuantity),
            this.inventoryService.adjustIncomingQuantity(product.id, -product.orderQuantity);
        }),
      );
      await this.purchaseOrderRepository.findByIdAndUpdate(entity);
      return entity;
    } else {
      throw new AppError('Bad request', 400);
    }
  }

  public async delete(id: string) {
    return this.purchaseOrderRepository.delete(id);
  }
}

export const purchaseOrderService = new PurchaseOrderService(purchaseOrderRepository);

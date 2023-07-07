import mongoose from 'mongoose';
import { SOStatus } from '../../constants/enums';
import { AppError, getIncrementValue } from '../../utils';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import { productService, ProductService } from '../product/product.service';
import { ISalesOrder, ISalesOrderProduct } from './interfaces/sales-order.interface';
import { SalesOrderEntity } from './sales-order.entity';
import { salesOrderRepository, SalesOrderRepository } from './sales-order.repository';

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
    await this.productService.validateProducts(data.products);
    const entity = new SalesOrderEntity(data).upsert();
    const salesOrder = this.salesOrderRepository.upsert(entity);
    await Promise.all(
      data.products.map((product: ISalesOrderProduct) =>
        this.inventoryService.adjustOutgoingQuantity(product.id, product.orderQuantity),
      ),
    );
    return salesOrder;
  }

  public async issueSalesOrder(id: string) {
    const salesOrder = await salesOrderRepository.findById(id);
    if (salesOrder && salesOrder.status === SOStatus.PENDING) {
      const entity = new SalesOrderEntity(salesOrder).issue();
      await this.productService.validateProducts(salesOrder.products);
      await Promise.all(
        entity.products.map((product: ISalesOrderProduct) => {
          this.inventoryService.adjustStockQuantity(product.id, -product.orderQuantity),
            this.inventoryService.adjustOutgoingQuantity(product.id, -product.orderQuantity);
        }),
      );
      await this.salesOrderRepository.findByIdAndUpdate(entity);
      return entity;
    } else {
      throw new AppError('Bad request', 400);
    }
  }

  public async delete(id: string) {
    return this.salesOrderRepository.delete(id);
  }
}

export const salesOrderService = new SalesOrderService(salesOrderRepository);

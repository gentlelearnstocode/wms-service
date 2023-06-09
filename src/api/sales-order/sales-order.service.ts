import mongoose from 'mongoose';
import { SOStatus } from '../../constants/enums';
import { AppError, getIncrementValue } from '../../utils';
import { inventoryService, InventoryService } from '../inventory/inventory.service';
import { productService, ProductService } from '../product/product.service';
import { ISalesOrder, ISalesOrderProduct } from './interfaces/sales-order.interface';
import { SalesOrderEntity } from './sales-order.entity';
import { salesOrderRepository, SalesOrderRepository } from './sales-order.repository';
import { IQuery } from '../../interfaces/query.interfaces';

export class SalesOrderService {
  private readonly inventoryService: InventoryService = inventoryService;
  private readonly productService: ProductService = productService;

  constructor(private readonly salesOrderRepository: SalesOrderRepository) {}

  public async findAll(query: IQuery) {
    return this.salesOrderRepository.findAll(query);
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
    const entity = new SalesOrderEntity(data).upsert();
    await this.productService.validateProducts(entity.products);
    const salesOrder = this.salesOrderRepository.upsert(entity);
    await Promise.all(
      entity.products.map((product: ISalesOrderProduct) =>
        this.inventoryService.adjustOutgoingQuantity(product.product, product.orderQuantity),
      ),
    );
    return salesOrder;
  }

  public async issueSalesOrder(id: string) {
    const salesOrder = await salesOrderRepository.findById(id);
    if (salesOrder && salesOrder.status === SOStatus.PENDING) {
      const entity = new SalesOrderEntity(salesOrder).issue();
      await this.productService.validateProducts(entity.products);
      await Promise.all(
        entity.products.map((product: ISalesOrderProduct) => {
          this.inventoryService.adjustStockQuantity(product.product, -product.orderQuantity),
            this.inventoryService.adjustOutgoingQuantity(product.product, -product.orderQuantity);
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

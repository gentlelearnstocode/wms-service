import SalesOrderModel from './sales-order.model';
import { ISalesOrder } from './interfaces/sales-order.interface';
import { buildLookupPipeline } from '../../utils';

export class SalesOrderRepository {
  public async findAll(): Promise<ISalesOrder[]> {
    const lookup1 = buildLookupPipeline('products', 'products.id', '_id', 'productDetail');
    const lookup2 = buildLookupPipeline('warehouses', 'warehouseId', '_id', 'warehouseDetail');
    return SalesOrderModel.aggregate([lookup1], [lookup2]);
  }

  public async findById(id: string): Promise<ISalesOrder | null> {
    return SalesOrderModel.findById(id);
  }

  async upsert(data: ISalesOrder): Promise<ISalesOrder | null> {
    return SalesOrderModel.findOneAndUpdate({ _id: data._id }, data, {
      upsert: true,
      new: true,
      returnDocument: 'after',
    });
  }

  public async delete(id: string): Promise<void | null> {
    return SalesOrderModel.findByIdAndDelete(id);
  }

  public async findByIdAndUpdate(data: ISalesOrder): Promise<void | null> {
    return SalesOrderModel.findByIdAndUpdate(data._id, data, {
      returnDocument: 'after',
      runValidators: true,
    });
  }
}

export const salesOrderRepository = new SalesOrderRepository();

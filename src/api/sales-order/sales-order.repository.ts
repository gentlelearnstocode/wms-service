import SalesOrderModel, { SalesOrderDoc } from './sales-order.model';
import { ISalesOrder } from './interfaces/sales-order.interface';
import { buildLookupPipeline } from '../../utils';

export class SalesOrderRepository {
  public async findAll() {
    const lookup1 = buildLookupPipeline('products', 'products.id', '_id', 'productDetail');
    const lookup2 = buildLookupPipeline('warehouses', 'warehouseId', '_id', 'warehouseDetail');
    return SalesOrderModel.aggregate([lookup1], [lookup2]);
  }

  public async findById(id: string): Promise<ISalesOrder | null> {
    return SalesOrderModel.findById(id);
  }

  async upsert(data: ISalesOrder) {
    return SalesOrderModel.findOneAndUpdate({ _id: data._id }, data, {
      upsert: true,
      new: true,
      returnDocument: 'after',
    });
  }

  public async delete(id: string) {
    await SalesOrderModel.findByIdAndDelete(id);
  }

  public async findByIdAndUpdate(data: ISalesOrder) {
    await SalesOrderModel.findByIdAndUpdate(data._id, data, {
      returnDocument: 'after',
      runValidators: true,
    });
  }
}

export const salesOrderRepository = new SalesOrderRepository();

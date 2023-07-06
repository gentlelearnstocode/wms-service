import SalesOrderModel from './sales-order.model';
import { ISalesOrder } from './interfaces/sales-order.interface';
import { buildLookupPipeline } from '../../utils';

export class SalesOrderRepository {
  public async findAll() {
    const lookup1 = buildLookupPipeline('products', 'products.id', '_id', 'productDetail');
    const lookup2 = buildLookupPipeline('warehouses', 'warehouseId', '_id', 'warehouseDetail');
    return SalesOrderModel.aggregate([lookup1], [lookup2]);
  }

  public async findById(id: string) {
    return SalesOrderModel.findById(id);
  }

  async upsert(data: ISalesOrder) {
    return SalesOrderModel.findOneAndUpdate({ _id: data._id }, data, {
      upsert: true,
      new: true,
    });
  }

  public async delete(id: string) {
    await SalesOrderModel.findByIdAndDelete(id);
  }
}

export const salesOrderRepository = new SalesOrderRepository();

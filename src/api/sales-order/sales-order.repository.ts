import SalesOrderModel from './sales-order.model';
import { RepositoryAbstract } from '../../abstracts';
import { ISalesOrder } from './interfaces/sales-order.interface';


export class SalesOrderRepository extends RepositoryAbstract {
  public async findAll() {
    const lookup1 = this.buildLookupPipeline('products', 'products.id', '_id', 'productDetail');
    const lookup2 = this.buildLookupPipeline('warehouses', 'warehouseId', '_id', 'warehouseDetail');
    return SalesOrderModel.aggregate([lookup1], [lookup2]);
  }

  public async findById(id: string) {
    const salesOrder = await SalesOrderModel.findById(id);
    return salesOrder;
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

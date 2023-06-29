import { RepositoryAbstract } from '../../abstracts';
import { SalesOrderModel } from '../models';

export class SalesOrderRepository extends RepositoryAbstract {
  public async findAll() {
    const lookup = {
      $lookup: {
        from: 'products',
        localField: 'products.id',
        foreignField: '_id',
        as: 'productDetail`',
      },
    };
    const salesOrders = await SalesOrderModel.aggregate([lookup]);
    return salesOrders;
  }

  public async findById(id: string) {
    const salesOrder = await SalesOrderModel.findById(id);
    return salesOrder;
  }

  public async create(data: any) {
    const salesOrder = await SalesOrderModel.create(data);
    return salesOrder;
  }

  public async delete(id: string) {
    await SalesOrderModel.findByIdAndDelete(id);
  }
}

import { IQuery } from '../../interfaces/query.interfaces';
import { ISalesOrder } from './interfaces/sales-order.interface';
import SalesOrderModel from './sales-order.model';

export class SalesOrderRepository {
  public async findAll(query: IQuery): Promise<ISalesOrder[]> {
    return SalesOrderModel.find({}, null, {
      skip: query.offset,
      limit: query.limit,
      populate: [
        {
          path: 'warehouse',
          select: '-__v',
        },
        {
          path: 'products.product',
          select: '-__v',
        },
      ],
    });
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

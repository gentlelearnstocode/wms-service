import { IQuery } from '../../interfaces/query.interfaces';
import { IPurchaseOrder } from './interfaces/purchase-order.interface';
import PurchaseOrderModel from './purchase-order.model';

export class PurchaseOrderRepository {
  public async findAll(query: IQuery): Promise<IPurchaseOrder[]> {
    return PurchaseOrderModel.find({}, null, {
      skip: query.offset,
      limit: query.limit,
      populate: [
        {
          path: 'products.product',
          select: '-__v',
        },
        {
          path: 'warehouse',
          select: '-__v',
        },
      ],
    });
  }

  public async findById(id: string): Promise<IPurchaseOrder | null> {
    return PurchaseOrderModel.findById(id);
  }

  async upsert(data: IPurchaseOrder): Promise<IPurchaseOrder> {
    return PurchaseOrderModel.findOneAndUpdate({ _id: data._id }, data, {
      upsert: true,
      new: true,
      returnDocument: 'after',
    });
  }

  public async delete(id: string): Promise<void> {
    await PurchaseOrderModel.findByIdAndDelete(id);
  }

  public async findByIdAndUpdate(data: IPurchaseOrder): Promise<void> {
    await PurchaseOrderModel.findByIdAndUpdate(data._id, data, {
      returnDocument: 'after',
      runValidators: true,
    });
  }
}

export const purchaseOrderRepository = new PurchaseOrderRepository();

import PurchaseOrderModel from './purchase-order.model';
import { IPurchaseOrder } from './interfaces/purchase-order.interface';
import { buildLookupPipeline } from '../../utils';

export class PurchaseOrderRepository {
  public async findAll(): Promise<IPurchaseOrder[]> {
    const lookup1 = buildLookupPipeline('products', 'products.id', '_id', 'productDetail');
    const lookup2 = buildLookupPipeline('warehouses', 'warehouseId', '_id', 'warehouseDetail');
    return PurchaseOrderModel.aggregate([lookup1], [lookup2]);
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

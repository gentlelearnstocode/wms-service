import PurchaseOrderModel from './purchase-order.model';
import { IPurchaseOrder } from './interfaces/purchase-order.interface';
import { buildLookupPipeline } from '../../utils';

export class PurchaseOrderRepository {
  public async findAll() {
    const lookup1 = buildLookupPipeline('products', 'products.id', '_id', 'productDetail');
    const lookup2 = buildLookupPipeline('warehouses', 'warehouseId', '_id', 'warehouseDetail');
    return PurchaseOrderModel.aggregate([lookup1], [lookup2]);
  }

  public async findById(id: string) {
    return PurchaseOrderModel.findById(id);
  }

  async upsert(data: IPurchaseOrder) {
    return PurchaseOrderModel.findOneAndUpdate({ _id: data._id }, data, {
      upsert: true,
      new: true,
      returnDocument: 'after',
    });
  }

  public async delete(id: string) {
    await PurchaseOrderModel.findByIdAndDelete(id);
  }
}

export const purchaseOrderRepository = new PurchaseOrderRepository();

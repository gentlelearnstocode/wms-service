import InventoryModel from './inventory.model';
import { IInventory } from './interfaces/inventory.interface';
import { buildLookupPipeline } from '../../utils';

export class InventoryRepository {
  public async findAll() {
    const lookup = buildLookupPipeline('products', 'productId', '_id', 'product');
    return InventoryModel.aggregate([lookup]);
  }

  public async findById(id: string) {
    return InventoryModel.findById(id);
  }

  public async upsert(data: IInventory) {
    return this.findOneAndUpdate(data.productId, data);
  }

  public async delete(id: string) {
    await InventoryModel.findByIdAndDelete(id);
  }

  public async findByProductId(productId: string) {
    return InventoryModel.find({ productId: { $eq: productId } });
  }

  public async findOneAndUpdate(filter: any, data: any) {
    return InventoryModel.findOneAndUpdate(filter, data, {
      upsert: true,
      new: true,
    });
  }
}

export const inventoryRepository = new InventoryRepository();

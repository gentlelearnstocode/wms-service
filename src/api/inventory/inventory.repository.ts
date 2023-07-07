import InventoryModel from './inventory.model';
import { IInventory } from './interfaces/inventory.interface';
import { buildLookupPipeline } from '../../utils';
import { FilterQuery, UpdateQuery } from 'mongoose';

export class InventoryRepository {
  public async findAll() {
    const lookup = buildLookupPipeline('products', 'productId', '_id', 'products');
    return InventoryModel.aggregate([lookup]);
  }

  public async findById(id: string) {
    return InventoryModel.findById(id);
  }

  public async upsert(data: IInventory) {
    return this.findOneAndUpdate({ productId: data.productId }, data);
  }

  public async delete(id: string) {
    await InventoryModel.findByIdAndDelete(id);
  }

  public async findByProductId(productId: string) {
    return InventoryModel.find({ productId: { $eq: productId } });
  }

  public async findOneAndUpdate(filter: FilterQuery<IInventory>, data: UpdateQuery<IInventory>) {
    return InventoryModel.findOneAndUpdate(filter, data, {
      upsert: true,
      new: true,
      returnDocument: 'after',
    });
  }
}

export const inventoryRepository = new InventoryRepository();

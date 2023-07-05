import InventoryModel from './inventory.model';
import { RepositoryAbstract } from '../../abstracts';
import { IInventory } from './interfaces/inventory.interface';

export class InventoryRepository extends RepositoryAbstract {
  public async findAll() {
    const lookup = this.buildLookupPipeline('products', 'productId', '_id', 'product');
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
    console.log('inventory filter', filter);
    return InventoryModel.findOneAndUpdate(filter, data, { upsert: true, new: true });
  }
}

export const inventoryRepository = new InventoryRepository();
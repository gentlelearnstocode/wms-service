import { IWarehouse } from './interfaces/warehouse.interfaces';
import WarehouseModel from './warehouse.model';
import { IQuery } from '../../interfaces/query.interfaces';

export class WarehouseRepository {
  public async findById(id: string) {
    return WarehouseModel.findById(id);
  }

  async findAll(query: IQuery) {
    return WarehouseModel.find().limit(query.limit).skip(query.offset);
  }

  public async delete(id: string) {
    await WarehouseModel.findByIdAndDelete(id);
  }

  public async upsert(data: IWarehouse) {
    return WarehouseModel.findOneAndUpdate({ name: data.name }, data, {
      upsert: true,
      new: true,
      returnDocument: 'after',
    });
  }
}

export const warehouseRepository = new WarehouseRepository();

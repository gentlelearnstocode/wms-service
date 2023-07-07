import { IWarehouse } from './interfaces/warehouse.interfaces';
import WarehouseModel from './warehouse.model';
import { IWarehouseQuery } from '../../interfaces/query.interfaces';
import { buildAggregationPipelines } from '../../utils';

export class WarehouseRepository {
  public async findById(id: string) {
    return WarehouseModel.findById(id);
  }

  async findAll(query: IWarehouseQuery) {
    const pipelines = buildAggregationPipelines(query);
    return WarehouseModel.aggregate(pipelines);
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

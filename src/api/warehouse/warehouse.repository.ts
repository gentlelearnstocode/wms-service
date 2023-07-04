import { IWarehouse } from '../../interfaces/warehouse.interfaces';
import WarehouseModel from './warehouse.model';
import { RepositoryAbstract } from '../../abstracts';
import { IWarehouseQuery } from '../../interfaces/query.interfaces';

export class WarehouseRepository extends RepositoryAbstract {
  public async findById(id: string) {
    return WarehouseModel.findById(id);
  }

  public async findAll(query: IWarehouseQuery) {
    const pipelines = this.buildAggregationPipelines(query);
    return WarehouseModel.aggregate(pipelines);
  }

  public async delete(id: string) {
    await WarehouseModel.findByIdAndDelete(id);
  }

  public async upsert(data: IWarehouse) {
    return WarehouseModel.findOneAndUpdate({ name: data.name }, data, {
      upsert: true,
      new: true,
    });
  }
}

export const warehouseRepository = new WarehouseRepository();
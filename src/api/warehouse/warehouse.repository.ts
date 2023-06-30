import { IWarehouse } from '../../interfaces/warehouse.interfaces';
import WarehouseModel from './warehouse.model';
import { RepositoryAbstract } from '../../abstracts';
import { IWarehouseQuery } from '../../interfaces/query.interfaces';

export class WarehouseRepository extends RepositoryAbstract {
  public async findById(id: string) {
    const warehouse = await WarehouseModel.findById(id);
    return warehouse;
  }

  public async findAll(query: IWarehouseQuery) {
    const pipelines = this.buildAggregationPipelines(query);
    const warehouses = await WarehouseModel.aggregate(pipelines);
    return warehouses;
  }

  public async create(data: IWarehouse): Promise<void> {
    await WarehouseModel.create(data);
  }

  public async delete(id: string) {
    await WarehouseModel.findByIdAndDelete(id);
  }
}

export const warehouseRepository = new WarehouseRepository();
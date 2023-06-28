import { IWarehouse } from "../../interfaces/warehouse.interfaces";
import { WarehouseModel } from "../models";
import { RepositoryAbstract } from "../../abstracts";
import { IWarehouseQuery } from "../../interfaces/query.interfaces";

export class WarehouseRepository extends RepositoryAbstract {
  async findById(id: string) {
    const warehouse = await WarehouseModel.findById(id);
    return warehouse;
  }

  async findAll(query: IWarehouseQuery) {
    const pipelines = this.buildAggreationPipelines(query);
    const warehouses = await WarehouseModel.aggregate(pipelines);
    return warehouses;
  }

  async create(data: IWarehouse): Promise<void> {
    await WarehouseModel.create(data);
  }
}
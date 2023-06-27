import { IWarehouse } from "../interfaces/warehouse.interfaces";
import { WarehouseModel } from "../models";

export class WarehouseRepository{
  async findById(id: string){
    const warehouse = await WarehouseModel.findById(id)
    return warehouse
  }

  async findAll(){
    const warehouses = await WarehouseModel.find()
    return warehouses
  }

  async create(warehouseData: IWarehouse): Promise<void> {
    await WarehouseModel.create(warehouseData)
  }
}
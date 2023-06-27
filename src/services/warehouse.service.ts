import { IWarehouse } from "../interfaces/warehouse.interfaces";
import { WarehouseRepository } from "../repositories/warehouse.repository";

export class WarehouseService {
  constructor(private readonly warehouseRepository: WarehouseRepository){}
  async findById(id: string){
    return this.warehouseRepository.findById(id)
  }

  async findAll(){
    return this.warehouseRepository.findAll()
  }

  async create(warehouseData: IWarehouse){
    return this.warehouseRepository.create(warehouseData)
  }
}
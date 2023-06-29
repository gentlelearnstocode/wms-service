import { IWarehouseQuery } from '../../interfaces/query.interfaces';
import { IWarehouse } from '../../interfaces/warehouse.interfaces';
import { WarehouseRepository } from '../repositories/warehouse.repository';

export class WarehouseService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {
  }

  public async findById(id: string) {
    return this.warehouseRepository.findById(id);
  }

  public async findAll(query: IWarehouseQuery) {
    return this.warehouseRepository.findAll(query);
  }

  public async create(data: IWarehouse) {
    return this.warehouseRepository.create(data);
  }

  public async delete(id: string) {
    return this.warehouseRepository.delete(id);
  }
}

import { IWarehouseQuery } from '../../interfaces/query.interfaces';
import { IWarehouse } from './interfaces/warehouse.interfaces';
import { warehouseRepository, WarehouseRepository } from './warehouse.repository';

export class WarehouseService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {
  }

  public async findById(id: string) {
    return this.warehouseRepository.findById(id);
  }

  public async findAll(query: IWarehouseQuery) {
    return this.warehouseRepository.findAll(query);
  }

  public async delete(id: string) {
    return this.warehouseRepository.delete(id);
  }

  public async upsert(data: IWarehouse) {
    return this.warehouseRepository.upsert(data);
  }
}

export const warehouseService = new WarehouseService(warehouseRepository);


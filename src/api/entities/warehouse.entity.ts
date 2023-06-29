import { IWarehouse } from '../../interfaces/warehouse.interfaces';

export class WarehouseEntity implements IWarehouse {
  name: string;
  address: string;
  createdAt: string;
  constructor(data: IWarehouse) {
    this.name = data.name;
    this.address = data.address;
    this.createdAt = data.createdAt;
  }
}

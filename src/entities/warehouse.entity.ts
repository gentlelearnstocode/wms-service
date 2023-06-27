import { IWarehouse } from "../interfaces/warehouse.interfaces";

export class WarehouseEntity implements IWarehouse {
  name: string;
  address: string;
  createdAt: string;
  constructor(name: string, address: string, createdAt: string) {
    this.name = name;
    this.address = address;
    this.createdAt = createdAt;
  }
}
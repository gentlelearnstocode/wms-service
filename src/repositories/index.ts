import { UserRepository } from "./user.repository";
import { WarehouseRepository } from "./warehouse.repository";

export const warehouseRepository = new WarehouseRepository()
export const userRepository = new UserRepository()
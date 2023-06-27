import { WarehouseService } from "./warehouse.service";
import { UserService } from "./user.service";

import { userRepository, warehouseRepository } from "../repositories";

export const warehouseService = new WarehouseService(warehouseRepository)
export const userService = new UserService(userRepository)
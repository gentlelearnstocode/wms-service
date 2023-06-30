import { Router } from 'express';
import { createInventory, getAllInventories } from './inventory.controller';
import { configService } from '../../configs';

const InventoryRouter = Router();
const api = configService.INVENTORY_API;

InventoryRouter.route(`${api}/update-inventory/:id`).patch(createInventory);
InventoryRouter.route(`${api}/`).get(getAllInventories);

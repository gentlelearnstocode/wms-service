import { Router } from 'express';

import { createInventory, getAllInventories } from '../controllers/inventory.controller';

const InventoryRouter = Router();
const api = '/inventory';

InventoryRouter.route(`${api}/update-inventory/:id`).patch(createInventory);
InventoryRouter.route(`${api}/`).get(getAllInventories);

import { Router } from "express";

import { createInventory, getAllInventories, getInventory } from "../controllers/inventory.controller";

const InventoryRouter = Router();

InventoryRouter.route('/update-inventory/:id').patch(createInventory);
InventoryRouter.route("/").get(getAllInventories);

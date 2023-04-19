import { Router } from "express";

import { createInventory, getAllInventories, getInventory } from "../controllers/InventoryController";

const InventoryRouter = Router();

InventoryRouter.route('/update-inventory/:id').patch(createInventory);
InventoryRouter.route("/").get(getAllInventories);

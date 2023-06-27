"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var inventory_controller_1 = require("../controllers/inventory.controller");
var InventoryRouter = (0, express_1.Router)();
InventoryRouter.route('/update-inventory/:id').patch(inventory_controller_1.createInventory);
InventoryRouter.route("/").get(inventory_controller_1.getAllInventories);

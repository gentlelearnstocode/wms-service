"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var WarehouseController_1 = require("../controllers/WarehouseController");
var WarehouseRoutes = (0, express_1.Router)();
WarehouseRoutes.route('/').get(WarehouseController_1.getAllWarehouses);
WarehouseRoutes.route('/:id').get(WarehouseController_1.getWarehouse);
WarehouseRoutes.route('/create-warehouse').post(WarehouseController_1.createWarehouse);
exports.default = WarehouseRoutes;

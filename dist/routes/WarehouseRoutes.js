"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configs_1 = require("../configs");
var warehouse_controller_1 = require("../controllers/warehouse.controller");
var middlewares_1 = require("../middlewares");
configs_1.configService.routeGETRequest('/', [middlewares_1.verifyToken, warehouse_controller_1.getAllWarehouses]);
configs_1.configService.routeGETRequest('/:id', [warehouse_controller_1.getWarehouse]);
configs_1.configService.routePOSTRequest('/create-warehouse', [middlewares_1.verifyToken, warehouse_controller_1.createWarehouse]);
exports.default = configs_1.configService.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseService = void 0;
var warehouse_service_1 = require("./warehouse.service");
var repositories_1 = require("../repositories");
exports.warehouseService = new warehouse_service_1.WarehouseService(repositories_1.warehouseRepository);

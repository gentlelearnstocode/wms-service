"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var supplier_controller_1 = require("../controllers/supplier.controller");
var SupplierRoutes = (0, express_1.Router)();
SupplierRoutes.route('/').get(supplier_controller_1.getAllSuppliers);
SupplierRoutes.route('/create-supplier').post(supplier_controller_1.createSupplier);
SupplierRoutes.route('/:id').get(supplier_controller_1.getSupplier);
exports.default = SupplierRoutes;

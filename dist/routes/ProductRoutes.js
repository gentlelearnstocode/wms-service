"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductController_1 = require("../controllers/ProductController");
var ProductRoutes = (0, express_1.Router)();
ProductRoutes.route('/').get(ProductController_1.getAllProducts);
ProductRoutes.route('/create-product').post(ProductController_1.createProduct);
ProductRoutes.route('/:id').get(ProductController_1.getProduct);
exports.default = ProductRoutes;

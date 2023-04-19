"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductController_1 = require("../controllers/ProductController");
var middlewares_1 = require("../middlewares");
var UserRoles_1 = __importDefault(require("../constants/UserRoles"));
var ProductRoutes = (0, express_1.Router)();
ProductRoutes.route('/').get(ProductController_1.getAllProducts);
ProductRoutes.route('/create-product').post(middlewares_1.verifyToken, function (req, res, next) {
    return (0, middlewares_1.authorizeRole)(req, res, next, [UserRoles_1.default.ADMIN, UserRoles_1.default.MANAGER]);
}, ProductController_1.createProduct);
ProductRoutes.route('/:id').get(ProductController_1.getProduct);
exports.default = ProductRoutes;

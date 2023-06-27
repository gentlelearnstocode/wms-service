"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseModel = exports.UserModel = exports.SupplierModel = exports.ProductModel = void 0;
var product_model_1 = __importDefault(require("./product.model"));
exports.ProductModel = product_model_1.default;
var supplier_model_1 = __importDefault(require("./supplier.model"));
exports.SupplierModel = supplier_model_1.default;
var user_model_1 = __importDefault(require("./user.model"));
exports.UserModel = user_model_1.default;
var warehouse_model_1 = __importDefault(require("./warehouse.model"));
exports.WarehouseModel = warehouse_model_1.default;

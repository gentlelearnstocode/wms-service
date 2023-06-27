"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
    },
    stockQuantity: {
        type: Number,
        default: 0,
    },
    outgoingQuantity: {
        type: Number,
        default: 0,
    },
    incomingQuantity: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: {
            values: ['in-stock', 'out-of-stock'],
            message: 'Status must be either in-stock or out-of-stock',
        },
        require: [true, 'Inventory must have a status'],
    },
});
var Inventory = mongoose_1.default.model('Inventory', schema);
exports.default = Inventory;

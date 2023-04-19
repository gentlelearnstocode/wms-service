"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
// Create mongoose schema for warehouse database model
var schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Warehouse must have a name'],
    },
    address: {
        type: String,
        required: [true, 'Warehouse must have an address'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
var Warehouse = mongoose_1.default.model('Warehouse', schema);
exports.default = Warehouse;

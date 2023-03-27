"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, 'Product must have a name'],
    },
    price: {
        type: Number,
        require: [true, 'Product must have price'],
    },
    quantity: {
        type: Number,
        require: [true, 'Product must have quanity'],
    },
    type: {
        type: String,
        enum: {
            values: ['RAW_MATERIAL', 'WORK_IN_PROGRESS', 'SUPPLIES', 'FINISHED_GOOD'],
            message: 'Product type must be valid',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    imageUrl: {
        type: String,
        require: true,
    },
});
var Product = mongoose_1.default.model('Product', schema);
exports.default = Product;

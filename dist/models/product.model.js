"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product must have a name'],
    },
    price: {
        type: Number,
        required: [true, 'Product must have price'],
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
    warehouse: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Warehouse',
            required: [true, 'A newly created product must belong to at least one warehouse'],
        },
    ],
    imageUrl: {
        type: String,
        required: true,
        default: 'https://www.ikea.com/sg/en/images/products/ikea-365-ihopparlig-wooden-chopping-board__0732009_PE729202_S5.JPG?f=s',
    },
    suppliers: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Supplier',
            required: [true, 'A product must have at least one supplier'],
        },
    ],
    inventory: {
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
    },
});
var ProductModel = mongoose_1.default.model('Product', schema);
exports.default = ProductModel;

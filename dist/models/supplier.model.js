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
        required: [true, 'Supplier must have name'],
    },
    contact: {
        phone: {
            type: Number,
            required: [true, 'Supplier contact must have phone number'],
        },
        email: {
            type: String,
            required: [true, 'Supplier contact must have email'],
        },
    },
    taxCode: {
        type: String,
        required: [true, 'Supplier must have tax code'],
    },
    addressInfo: {
        address: {
            type: String,
            required: [true, 'Supplier must have address'],
        },
        location: {
            longitude: {
                type: String,
                required: [true, 'Supplier location must have longitude'],
            },
            latitude: {
                type: String,
                required: [true, 'Supplier location must have latitude'],
            },
        },
    },
});
var SupplierModel = mongoose_1.default.model('Supplier', schema);
exports.default = SupplierModel;

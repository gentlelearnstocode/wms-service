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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
var schema = new mongoose_1.Schema({
    //create mongoose schema for user database model
    email: {
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator_1.default.isEmail, 'User email must be valid'],
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'manager', 'staff'],
            message: 'User role must be valid',
        },
        default: 'staff',
        required: [true, 'User must have a role'],
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        select: false,
    },
    warehouse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Warehouse',
        require: [true, 'A user must belong to at least one warehouse'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
// schema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     return next();
//   } else {
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
//   }
// });
var User = mongoose_1.default.model('User', schema);
exports.default = User;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
var schema = new mongoose_1.default.Schema({
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
        default: 'STAFF',
        required: [true, 'User must have a role'],
    },
    // warehouse: {
    //   type: String,
    //   require: [true, 'User must have a warehouse'],
    // },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        select: false,
    },
    warehouse: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Warehouse',
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

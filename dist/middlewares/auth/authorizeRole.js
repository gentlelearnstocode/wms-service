"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var Message_1 = __importDefault(require("../../constants/Message"));
var authorizeRole = function (req, res, next, userRole) {
    if (userRole.includes(req.body.user.role)) {
        next();
    }
    else {
        return next(new utils_1.AppError(Message_1.default.UNAUTHORIZED_REQUEST, 403));
    }
};
exports.default = authorizeRole;

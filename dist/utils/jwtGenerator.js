"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerator = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var configs_1 = require("../configs");
var jwtGenerator = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, configs_1.configService.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'HS256',
    });
};
exports.jwtGenerator = jwtGenerator;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
var AppError_1 = require("../utils/AppError");
var Message_1 = __importDefault(require("../constants/Message"));
var Error_1 = __importDefault(require("../constants/Error"));
var Status_1 = __importDefault(require("../constants/Status"));
var sendErrorDev = function (err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
var sendErrorProd = function (err, res) {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            status: Status_1.default.ERROR,
            message: Message_1.default.INTERNAL_SERVER_ERROR,
        });
    }
};
var castErrorHandler = function (err, res) {
    var message = "Invalid ".concat(err.path, ": ").concat(err.value);
    return new AppError_1.AppError(message, 400);
};
var duplicateErrorHandler = function (err, res) {
    var value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    var message = "Duplicate field value: ".concat(value, ". Please use another value");
    return new AppError_1.AppError(message, 400);
};
var ValidationErrorHandler = function (err, res) {
    var errors = Object.values(err.errors).map(function (el) { return el.message; });
    var message = "Invalid input data. ".concat(errors.join('. '));
    return new AppError_1.AppError(message, 400);
};
var ErrorController = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        var error = __assign({}, err);
        if (error.name === Error_1.default.CAST_ERROR)
            error = castErrorHandler(error, res);
        if (error.code === 11000)
            error = duplicateErrorHandler(error, res);
        if (error.name === Error_1.default.VALIDATION_ERROR)
            error = ValidationErrorHandler(error, res);
        sendErrorProd(error, res);
    }
};
exports.ErrorController = ErrorController;

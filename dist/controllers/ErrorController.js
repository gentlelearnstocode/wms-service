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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
var AppError_1 = require("../utils/AppError");
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
        console.error('ERROR', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong',
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
        if (error.name === 'CastError')
            error = castErrorHandler(error, res);
        if (error.code === 11000)
            error = duplicateErrorHandler(error, res);
        if (error.name === 'ValidationError')
            error = ValidationErrorHandler(error, res);
        sendErrorProd(error, res);
    }
};
exports.ErrorController = ErrorController;

"use strict";
//write a function to catch async errors
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
var catchAsync = function (fn) { return function (req, res, next) {
    fn(req, res, next).catch(next);
}; };
exports.catchAsync = catchAsync;

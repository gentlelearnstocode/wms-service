"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var authorizeRole = function (req, res, next, userRole) {
    if (userRole.includes(req.body.user.role)) {
        next();
    }
    else {
        return next(new utils_1.AppError('You are not authorized to perform this action', 403));
    }
};
exports.default = authorizeRole;

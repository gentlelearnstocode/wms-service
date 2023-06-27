"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.router = (0, express_1.Router)();
        (0, dotenv_1.config)({
            path: '.env',
        });
    }
    Object.defineProperty(ConfigService.prototype, "NODE_ENV", {
        get: function () {
            return process.env.NODE_ENV || '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "PORT", {
        get: function () {
            return Number(process.env.PORT) || 8001;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "MONGO_URI", {
        get: function () {
            return process.env.DATABASE || '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "DATABASE_PASSWORD", {
        get: function () {
            return process.env.DATABASE_PASSWORD || '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "JWT_SECRET", {
        get: function () {
            return process.env.JWT_SECRET || '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfigService.prototype, "JWT_EXPIRES_IN", {
        get: function () {
            return process.env.JWT_EXPIRES_IN || '';
        },
        enumerable: false,
        configurable: true
    });
    ConfigService.prototype.routeGETRequest = function (path, fn) {
        var _a;
        (_a = this.router.route(path)).get.apply(_a, fn);
    };
    ConfigService.prototype.routePOSTRequest = function (path, fn) {
        var _a;
        (_a = this.router.route(path)).post.apply(_a, fn);
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAllUsers = exports.signInUser = exports.createUser = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var models_1 = require("../models");
var Status_1 = __importDefault(require("../constants/Status"));
var utils_1 = require("../utils");
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, warehouse, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    return [2 /*return*/, next(new utils_1.AppError('Please provide an email', 400))];
                if (!req.body.password)
                    return [2 /*return*/, next(new utils_1.AppError('Please provide a password', 400))];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 12)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, models_1.Warehouse.create({
                        name: 'Warehouse 4',
                        address: '518BBB Dien Bien Phu',
                    })];
            case 3:
                warehouse = _a.sent();
                return [4 /*yield*/, models_1.User.create(__assign(__assign({}, req.body), { password: hashedPassword, warehouse: warehouse }))];
            case 4:
                user = _a.sent();
                token = (0, utils_1.jwtGenerator)(user._id);
                res.status(201).json({
                    status: Status_1.default.SUCCESS,
                    token: token,
                    data: {
                        user: user,
                    },
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, next(error_1)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var signInUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, token, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, next(new utils_1.AppError('Please provide email and password', 400))];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, models_1.User.findOne({ email: email }).select('+password')];
            case 2:
                user = _c.sent();
                _b = !user;
                if (_b) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                _b = !(_c.sent());
                _c.label = 4;
            case 4:
                if (_b) {
                    return [2 /*return*/, next(new utils_1.AppError('Incorrect email or password', 401))];
                }
                else {
                    token = (0, utils_1.jwtGenerator)(user._id);
                    res.status(201).json({
                        status: Status_1.default.SUCCESS,
                        token: token,
                        data: user,
                    });
                }
                return [3 /*break*/, 6];
            case 5:
                error_2 = _c.sent();
                return [2 /*return*/, next(error_2)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.signInUser = signInUser;
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.User.find()];
            case 1:
                users = _a.sent();
                res.status(200).json({
                    status: Status_1.default.SUCCESS,
                    data: {
                        result: users.length,
                        users: users,
                    },
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.User.findById(req.params.id)];
            case 1:
                user = _a.sent();
                res.status(200).json({
                    status: Status_1.default.SUCCESS,
                    data: {
                        user: user,
                    },
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;

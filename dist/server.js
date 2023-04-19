"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
//Third party imports
var dotenv_1 = require("dotenv");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var morgan_1 = __importDefault(require("morgan"));
//Local imports
var routes_1 = require("./routes");
var ErrorController_1 = require("./controllers/ErrorController");
var AppError_1 = require("./utils/AppError");
var MainRoutes_1 = __importDefault(require("./constants/MainRoutes"));
//Config
(0, dotenv_1.config)({ path: '.env' });
var app = (0, express_1.default)();
var PORT = process.env.PORT || 8001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
//Database
var DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default
    .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    console.log('Database connected successfully');
})
    .catch(function (err) {
    console.log("Database connection failed: ".concat(err));
});
//App
app.use(function (req, res, next) {
    console.log('----------request body-----------', req.body);
    next();
});
app.use(MainRoutes_1.default.USERS, routes_1.UserRoutes);
app.use(MainRoutes_1.default.WAREHOUSES, routes_1.WarehouseRoutes);
app.use(MainRoutes_1.default.PRODUCTS, routes_1.ProductRoutes);
//Global error handler
app.all('*', function (req, res, next) {
    next(new AppError_1.AppError("Can't find ".concat(req.originalUrl, " on this server"), 404));
});
app.use(ErrorController_1.ErrorController);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});

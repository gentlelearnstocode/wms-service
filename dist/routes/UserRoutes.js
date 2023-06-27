"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controllers/user.controller");
var configs_1 = require("../configs");
configs_1.configService.routeGETRequest('/', [user_controller_1.getAllUsers]);
configs_1.configService.routePOSTRequest('/create-user', [user_controller_1.createUser]);
configs_1.configService.routeGETRequest('/:id', [user_controller_1.getUser]);
exports.default = configs_1.configService.router;

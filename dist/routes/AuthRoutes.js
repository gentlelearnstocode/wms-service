"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configs_1 = require("../configs");
var auth_controller_1 = require("../controllers/auth.controller");
configs_1.configService.router.route('/signin').post(auth_controller_1.signInUser);
exports.default = configs_1.configService.router;

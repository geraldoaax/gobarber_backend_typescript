"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
var express_1 = require("express");
var appointements_routes_1 = __importDefault(require("./appointements.routes"));
var routes = express_1.Router();
routes.use('/appointements', appointements_routes_1.default);
exports.default = routes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../Controllers/User.controller"));
const router = (0, express_1.Router)();
router.post("/register", User_controller_1.default.register);
router.post("/login", User_controller_1.default.login);
exports.default = router;

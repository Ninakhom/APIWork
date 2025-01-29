"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /Route/index.ts
const CategoryWork_Route_1 = __importDefault(require("./CategoryWork.Route"));
const Auth_middleware_1 = require("../Middleware/Auth.middleware");
const Position_Route_1 = __importDefault(require("./Position.Route"));
const express_1 = require("express");
const User_Route_1 = __importDefault(require("./User.Route"));
const router = (0, express_1.Router)();
router.use("/category", CategoryWork_Route_1.default);
// router.use(
//   "/category",
//   authenticateToken,
//   authorize(["Student"]),
//   categorywork
// );
router.use("/position", Auth_middleware_1.authenticateToken, Position_Route_1.default);
router.use("/user", User_Route_1.default);
exports.default = router;

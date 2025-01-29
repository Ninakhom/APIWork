"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Position_controller_1 = __importDefault(require("../Controllers/Position.controller"));
const router = (0, express_1.Router)();
router.get("/positions", Position_controller_1.default.getPosition);
router.post("/positions", Position_controller_1.default.createPosition);
router.put("/positions/:id", Position_controller_1.default.updatePosition);
router.delete("/positions/:id", Position_controller_1.default.deletePosition);
exports.default = router;

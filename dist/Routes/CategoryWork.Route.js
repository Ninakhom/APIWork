"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /Route/CategoryWork.Router.ts
const express_1 = require("express");
const CategoryWork_controller_1 = __importDefault(require("../Controllers/CategoryWork.controller"));
const router = (0, express_1.Router)();
// Fetch all categories
router.get("/categories", CategoryWork_controller_1.default.getCategoryWorksList);
// Create a new category
router.post("/categories", CategoryWork_controller_1.default.createCategoryWork);
// Update a category by ID
router.put("/categories/:id", CategoryWork_controller_1.default.updateCategoryWork);
// Delete a category by ID
router.delete("/categories/:id", CategoryWork_controller_1.default.deleteCategoryWork);
exports.default = router;

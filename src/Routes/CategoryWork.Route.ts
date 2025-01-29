// /Route/CategoryWork.Router.ts
import { Router } from "express";
import CategoryWorkController from "../Controllers/CategoryWork.controller";

const router = Router();

// Fetch all categories
router.get("/categories", CategoryWorkController.getCategoryWorksList);

// Create a new category
router.post("/categories", CategoryWorkController.createCategoryWork);

// Update a category by ID
router.put("/categories/:id", CategoryWorkController.updateCategoryWork);

// Delete a category by ID
router.delete("/categories/:id", CategoryWorkController.deleteCategoryWork);

export default router;

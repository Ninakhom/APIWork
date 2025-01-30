import BadRequestError from "../Error/BadRequestError";

import {
  addCategoryWork,
  deleteCategoryWork,
  getallCagetoryWork,
  updateCategoryWork,
} from "../Services/Cagetory.service";
import { Request, Response, NextFunction } from "express";
import { validateAddCategoryWork } from "../schema/schema";

export default {
  getCategoryWorksList: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await getallCagetoryWork(Number(page), Number(limit));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  createCategoryWork: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { category, categoryIcon } = req.body;
      const isCategoryValid = validateAddCategoryWork(req.body);
      if (!isCategoryValid) {
        throw new BadRequestError({
          code: 400,
          message: "Missing or invalid 'category' field",
          context: validateAddCategoryWork.errors || undefined,
        });
      }

      const newCategoryWork = await addCategoryWork(category, categoryIcon);
      res.status(201).json(newCategoryWork);
    } catch (error) {
      next(error);
    }
  },

  updateCategoryWork: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { category, categoryIcon } = req.body;
      const isCategoryValid = validateAddCategoryWork(req.body);
      if (!id || isNaN(Number(id))) {
        throw new BadRequestError({
          code: 400,
          message: "Invalid or missing 'id' field",
          context: { id: req.params.id },
        });
      } else if (!isCategoryValid) {
        throw new BadRequestError({
          code: 400,
          message: "Missing or invalid 'category' field",
          context: validateAddCategoryWork.errors || undefined,
        });
      }

      const updatedCategoryWork = await updateCategoryWork(
        Number(id),
        category,
        categoryIcon
      );
      res.status(200).json(updatedCategoryWork);
    } catch (error) {
      next(error);
    }
  },

  deleteCategoryWork: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        throw new BadRequestError({
          code: 400,
          message: "Invalid or missing 'id' field",
          context: { id: req.params.id },
        });
      }

      const deletedCategory = await deleteCategoryWork(Number(id), {
        isDeleted: true,
      });
      res.status(200).json(deletedCategory);
    } catch (error) {
      next(error);
    }
  },
};

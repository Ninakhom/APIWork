import { Request, Response, NextFunction } from "express";
import {
  getallPosition,
  addPosition,
  updatePosition,
  deletePosition,
} from "../Services/Position.service";
import BadRequestError from "../Error/BadRequestError";
import { validatePosition } from "../schema/schema";
export default {
  getPosition: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const position = await getallPosition(Number(page), Number(limit));
      res.status(200).json(position);
    } catch (error) {
      next(error);
    }
  },
  createPosition: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isPositionValid = validatePosition(req.body);
      if (!isPositionValid) {
        throw new BadRequestError({
          code: 400,
          message: "Missing or invalid 'position' field",
          context: validatePosition.errors || undefined,
        });
      }
      const newPosition = await addPosition(req.body.position);
      res.status(201).json(newPosition);
    } catch (error) {
      next(error);
    }
  },
  updatePosition: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const isPositionValid = validatePosition(req.body);
      if (!id || isNaN(Number(id))) {
        throw new BadRequestError({
          code: 400,
          message: "Invalid or missing 'id' field",
          context: { id },
        });
      } else if (!isPositionValid) {
        throw new BadRequestError({
          code: 400,
          message: "Missing or invalid 'position' field",
          context: validatePosition.errors || undefined,
        });
      }
      const updatedPosition = await updatePosition(
        Number(id),
        req.body.position
      );
      res.status(200).json(updatedPosition);
    } catch (error) {
      next(error);
    }
  },
  deletePosition: async (
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
          context: { id },
        });
      }
      const deletedPosition = await deletePosition(Number(id), {
        isDeleted: true,
      });
      res.status(200).json(deletedPosition);
    } catch (error) {
      next(error);
    }
  },
};

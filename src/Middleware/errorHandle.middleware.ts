import { Request, Response, NextFunction } from "express";
import { CustomError } from "../Types/CustomError";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const errorHandler = (
  err: unknown, // Accept `unknown` to handle any type of error
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error for debugging
  console.error(`[${new Date().toISOString()}] Error:`, err);

  // Normalize error using handleError
  const normalizedError = handleError(err);

  // Respond based on error type
  if (normalizedError instanceof CustomError) {
    res.status(normalizedError.statusCode).json({
      status: normalizedError.statusCode,
      message: normalizedError.message,
      errors: normalizedError.errors || null,
    });
  } else if (err instanceof PrismaClientKnownRequestError) {
    res.status(400).json({
      status: "error",
      message: "Database error (known request error)",
      code: err.code,
      meta: err.meta,
    });
  } else if (err instanceof PrismaClientUnknownRequestError) {
    res.status(400).json({
      status: "error",
      message: "Database error (unknown request error)",
    });
  } else if (err instanceof PrismaClientValidationError) {
    res.status(400).json({
      status: "error",
      message: "Database validation error",
    });
  } else {
    res.status(500).json({
      status: "error",
      message: normalizedError.message || "Internal Server Error",
    });
  }
};

// Normalize errors into a standard Error object
function handleError(err: unknown): Error {
  if (err instanceof Error) {
    return err;
  }

  if (
    err instanceof PrismaClientKnownRequestError ||
    err instanceof PrismaClientUnknownRequestError ||
    err instanceof PrismaClientValidationError
  ) {
    const prismaError = new Error(err.message);
    prismaError.stack = err.stack;
    return prismaError;
  }

  // Handle unknown errors
  const unknownError = new Error("Unknown error");
  if (typeof err === "string") {
    unknownError.message = err;
  } else if (typeof err === "object" && err !== null) {
    unknownError.message = JSON.stringify(err);
  }
  return unknownError;
}

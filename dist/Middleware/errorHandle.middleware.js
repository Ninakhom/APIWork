"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../Types/CustomError");
const library_1 = require("@prisma/client/runtime/library");
const errorHandler = (err, // Accept `unknown` to handle any type of error
req, res, next) => {
    // Log the error for debugging
    console.error(`[${new Date().toISOString()}] Error:`, err);
    // Normalize error using handleError
    const normalizedError = handleError(err);
    // Respond based on error type
    if (normalizedError instanceof CustomError_1.CustomError) {
        res.status(normalizedError.statusCode).json({
            status: normalizedError.statusCode,
            message: normalizedError.message,
            errors: normalizedError.errors || null,
        });
    }
    else if (err instanceof library_1.PrismaClientKnownRequestError) {
        res.status(400).json({
            status: "error",
            message: "Database error (known request error)",
            code: err.code,
            meta: err.meta,
        });
    }
    else if (err instanceof library_1.PrismaClientUnknownRequestError) {
        res.status(400).json({
            status: "error",
            message: "Database error (unknown request error)",
        });
    }
    else if (err instanceof library_1.PrismaClientValidationError) {
        res.status(400).json({
            status: "error",
            message: "Database validation error",
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: normalizedError.message || "Internal Server Error",
        });
    }
};
exports.errorHandler = errorHandler;
// Normalize errors into a standard Error object
function handleError(err) {
    if (err instanceof Error) {
        return err;
    }
    if (err instanceof library_1.PrismaClientKnownRequestError ||
        err instanceof library_1.PrismaClientUnknownRequestError ||
        err instanceof library_1.PrismaClientValidationError) {
        const prismaError = new Error(err.message);
        prismaError.stack = err.stack;
        return prismaError;
    }
    // Handle unknown errors
    const unknownError = new Error("Unknown error");
    if (typeof err === "string") {
        unknownError.message = err;
    }
    else if (typeof err === "object" && err !== null) {
        unknownError.message = JSON.stringify(err);
    }
    return unknownError;
}

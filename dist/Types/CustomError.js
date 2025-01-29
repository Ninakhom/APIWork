"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
    getErrorMessage() {
        return this.errors.map((err) => err.message).join(", ");
    }
}
exports.CustomError = CustomError;

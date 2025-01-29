"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Types/CustomError");
class InternalServerError extends CustomError_1.CustomError {
    constructor(params) {
        const { statusCode, message, logging, context } = params || {};
        super(message || "Internal server error");
        this._statusCode = statusCode || InternalServerError._defaultStatusCode;
        this._logging = logging || true; // ควร Log เสมอเมื่อเกิด Internal Server Error
        this._context = context || {};
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get statusCode() {
        return this._statusCode;
    }
    get logging() {
        return this._logging;
    }
}
InternalServerError._defaultStatusCode = 500;
exports.default = InternalServerError;

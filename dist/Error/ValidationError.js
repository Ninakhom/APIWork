"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Types/CustomError");
class ValidationError extends CustomError_1.CustomError {
    constructor(params) {
        const { statusCode, message, logging, context } = params || {};
        super(message || "Validation failed");
        this._statusCode = statusCode || ValidationError._defaultStatusCode;
        this._logging = logging || false;
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
ValidationError._defaultStatusCode = 400;
exports.default = ValidationError;

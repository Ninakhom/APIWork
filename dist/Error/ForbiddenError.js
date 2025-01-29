"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Types/CustomError");
class ForbiddenError extends CustomError_1.CustomError {
    constructor(params) {
        const { statusCode, message, logging, context } = params || {};
        super(message || "Forbidden action");
        this._statusCode = statusCode || ForbiddenError._defaultStatusCode;
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
ForbiddenError._defaultStatusCode = 403;
exports.default = ForbiddenError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Types/CustomError");
class BadRequestError extends CustomError_1.CustomError {
    constructor(params) {
        const { code, message, logging, context } = params || {};
        super(message || "Bad request");
        this._statusCode = code || BadRequestError._defaultstatusCode;
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
BadRequestError._defaultstatusCode = 400;
exports.default = BadRequestError;

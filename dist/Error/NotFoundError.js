"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Types/CustomError");
class NotFoundError extends CustomError_1.CustomError {
    constructor(params) {
        const { code, message, logging, context } = params || {};
        super(message || "Resourece not found");
        this._statusCode = code || NotFoundError._defautstatusCode;
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
NotFoundError._defautstatusCode = 404;
exports.default = NotFoundError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Types/CustomError");
class Unauthorized extends CustomError_1.CustomError {
    constructor(params) {
        const { code, message, logging, context } = params || {};
        super(message || "Unauthorized access");
        this._statusCode = code || Unauthorized._defaultstatusCode;
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
Unauthorized._defaultstatusCode = 401;
exports.default = Unauthorized;

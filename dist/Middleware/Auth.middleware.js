"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UnauthorizedError_1 = __importDefault(require("../Error/UnauthorizedError"));
const ForbiddenError_1 = __importDefault(require("../Error/ForbiddenError"));
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            throw new UnauthorizedError_1.default({
                code: 401,
                message: "Unauthorized",
                context: { message: "Token is missing" },
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        // ตรวจสอบ Token และดึงข้อมูลผู้ใช้
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded; // บันทึกข้อมูลผู้ใช้ใน Request
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticateToken = authenticateToken;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw new UnauthorizedError_1.default({
                code: 401,
                message: "Unauthorized",
                context: { message: "User information is missing" },
            });
        }
        if (!roles.includes(req.user.role)) {
            throw new ForbiddenError_1.default({
                statusCode: 403, // ควรใช้ 403 สำหรับการห้ามเข้าถึง
                message: "Forbidden",
                context: { message: "Role is not allowed" },
            });
        }
        next();
    };
};
exports.authorize = authorize;

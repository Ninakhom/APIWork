"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.login = exports.register = void 0;
const BadRequestError_1 = __importDefault(require("../Error/BadRequestError"));
const prisma_1 = require("../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // ใช้ jwt แทน Jwt
const bcrypt_1 = __importDefault(require("bcrypt")); // ใช้ bcrypt แทน Bcrypt
// กำหนด Secret Key และ Expiration Time
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET; // เปลี่ยนเป็นค่า Secret Key จริง
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET; // เปลี่ยนเป็นค่า Secret Key จริง
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // Access Token หมดอายุใน 15 นาที
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // Refresh Token หมดอายุใน 7 วัน
// ฟังก์ชันสำหรับสร้าง Token
function generateToken(user, secret, expiresIn) {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secret, {
        expiresIn,
    });
}
// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้
const register = (username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            throw new BadRequestError_1.default({
                code: 400,
                message: "User already exists",
                context: { username },
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        return yield prisma_1.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role,
            },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.register = register;
// ฟังก์ชันสำหรับล็อกอิน
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new BadRequestError_1.default({
                code: 400,
                message: "User not found",
                context: { username },
            });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new BadRequestError_1.default({
                code: 400,
                message: "Invalid password",
            });
        }
        // สร้าง Access Token และ Refresh Token
        const accessToken = generateToken(user, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN);
        const refreshToken = generateToken(user, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN);
        return { accessToken, refreshToken, user };
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
// ฟังก์ชันสำหรับสร้าง Access Token ใหม่โดยใช้ Refresh Token
const refreshAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ตรวจสอบ Refresh Token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
        // ค้นหาผู้ใช้
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: Number(decoded.userId) },
        });
        if (!user) {
            throw new BadRequestError_1.default({
                code: 400,
                message: "User not found",
            });
        }
        // สร้าง Access Token ใหม่
        return generateToken(user, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN);
    }
    catch (error) {
        throw new BadRequestError_1.default({
            code: 400,
            message: "Invalid refresh token",
        });
    }
});
exports.refreshAccessToken = refreshAccessToken;

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
const schema_1 = require("../schema/schema"); // แยก Schema Validation
const BadRequestError_1 = __importDefault(require("../Error/BadRequestError"));
const User_service_1 = require("../Services/User.service");
exports.default = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isValid = (0, schema_1.validateRegister)(req.body); // ใช้ Schema สำหรับการลงทะเบียน
            if (!isValid) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Invalid or missing fields",
                    context: schema_1.validateRegister.errors || undefined,
                });
            }
            const { username, password, role } = req.body;
            const newUser = yield (0, User_service_1.register)(username, password, role);
            res.status(201).json(newUser);
        }
        catch (error) {
            next(error);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isValid = (0, schema_1.validateLogin)(req.body); // ใช้ Schema สำหรับการล็อกอิน
            if (!isValid) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Invalid or missing fields",
                    context: schema_1.validateLogin.errors || undefined,
                });
            }
            const { username, password } = req.body;
            const { accessToken, refreshToken } = yield (0, User_service_1.login)(username, password); // ส่งคืน Token
            res.status(200).json({ accessToken, refreshToken });
        }
        catch (error) {
            next(error);
        }
    }),
};

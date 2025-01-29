"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = exports.validatePosition = exports.validateAddCategoryWork = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const AddCategoryWorkSchema = {
    type: "object",
    properties: {
        category: { type: "string", minLength: 1 }, // ตรวจสอบเฉพาะ category
    },
    required: ["category"], // 'category' เป็นฟิลด์ที่จำเป็น
    additionalProperties: false, // ไม่อนุญาตให้มีฟิลด์อื่นนอกเหนือจากนี้
};
exports.validateAddCategoryWork = ajv.compile(AddCategoryWorkSchema);
const PositionSchema = {
    type: "object",
    properties: {
        position: { type: "string", minLength: 1 },
    },
    required: ["position"],
    additionalProperties: false,
};
exports.validatePosition = ajv.compile(PositionSchema);
const UserRegister = {
    type: "object",
    properties: {
        username: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 1 },
        role: { type: "string", enum: ["Admin", "Student", "Company"] },
    },
    required: ["username", "password", "role"],
    additionalProperties: false,
};
exports.validateRegister = ajv.compile(UserRegister);
const UserLogin = {
    type: "object",
    properties: {
        username: { type: "string", minLength: 1 },
        password: { type: "string", minLength: 1 },
    },
    required: ["username", "password"],
    additionalProperties: false,
};
exports.validateLogin = ajv.compile(UserLogin);

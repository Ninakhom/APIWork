import { Position } from "./../Types/Type";
import Ajv from "ajv";
const ajv = new Ajv();
const AddCategoryWorkSchema = {
  type: "object",
  properties: {
    category: { type: "string", minLength: 1 }, // ตรวจสอบเฉพาะ category
  },
  required: ["category"], // 'category' เป็นฟิลด์ที่จำเป็น
  additionalProperties: false, // ไม่อนุญาตให้มีฟิลด์อื่นนอกเหนือจากนี้
};

export const validateAddCategoryWork = ajv.compile(AddCategoryWorkSchema);

const PositionSchema = {
  type: "object",
  properties: {
    position: { type: "string", minLength: 1 },
  },
  required: ["position"],
  additionalProperties: false,
};
export const validatePosition = ajv.compile(PositionSchema);

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
export const validateRegister = ajv.compile(UserRegister);
const UserLogin = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 1 },
    password: { type: "string", minLength: 1 },
  },
  required: ["username", "password"],
  additionalProperties: false,
};
export const validateLogin = ajv.compile(UserLogin);

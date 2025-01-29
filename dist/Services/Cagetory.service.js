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
exports.deleteCategoryWork = exports.updateCategoryWork = exports.addCategoryWork = exports.getallCagetoryWork = void 0;
const BadRequestError_1 = __importDefault(require("../Error/BadRequestError"));
const prisma_1 = require("../lib/prisma");
const getallCagetoryWork = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    // skip: จำนวนรายการที่ต้อง "ข้าม" ก่อนที่จะเริ่มดึงข้อมูลในหน้าปัจจุบัน
    // ตัวอย่าง:
    // ถ้าอยู่หน้า 1: (1 - 1) * 10 = 0 → ไม่ข้ามรายการใดเลย
    // ถ้าอยู่หน้า 2: (2 - 1) * 10 = 10 → ข้าม 10 รายการแรก
    // ถ้าอยู่หน้า 3: (3 - 1) * 10 = 20 → ข้าม 20 รายการแรก
    const [data, total] = yield Promise.all([
        prisma_1.prisma.cagetoryWork.findMany({
            where: { isDeleted: false },
            skip,
            take: limit,
        }),
        prisma_1.prisma.cagetoryWork.count({ where: { isDeleted: false } }),
    ]);
    return { data, total, page };
});
exports.getallCagetoryWork = getallCagetoryWork;
const addCategoryWork = (category // แก้ไข Type ให้รับ string
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ตรวจสอบว่ามี category นี้อยู่แล้วหรือไม่
        const existingCategory = yield prisma_1.prisma.cagetoryWork.findUnique({
            where: { category: category },
        });
        // ถ้ามี category ซ้ำกันอยู่แล้ว ให้ส่งข้อผิดพลาด
        if (existingCategory) {
            throw new BadRequestError_1.default({
                code: 400,
                message: "Category already exists",
                context: { category },
            });
        }
        // ถ้าไม่มี category ซ้ำกัน ให้สร้างข้อมูลใหม่
        return yield prisma_1.prisma.cagetoryWork.create({
            data: {
                category: category,
            },
        });
    }
    catch (error) {
        // ส่งข้อผิดพลาดไปยัง Controller
        throw error;
    }
});
exports.addCategoryWork = addCategoryWork;
const updateCategoryWork = (id, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.prisma.cagetoryWork.update({
            where: { id },
            data: { category },
        });
    }
    catch (error) {
        // ส่งข้อผิดพลาดไปยัง Controller
        throw error;
    }
});
exports.updateCategoryWork = updateCategoryWork;
const deleteCategoryWork = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_1.prisma.cagetoryWork.update({ where: { id }, data });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCategoryWork = deleteCategoryWork;

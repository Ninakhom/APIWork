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
exports.deletePosition = exports.updatePosition = exports.addPosition = exports.getallPosition = void 0;
const prisma_1 = require("../lib/prisma");
const BadRequestError_1 = __importDefault(require("../Error/BadRequestError"));
const getallPosition = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = yield Promise.all([
        prisma_1.prisma.position.findMany({
            where: { isDeleted: false },
            skip,
            take: limit,
        }),
        prisma_1.prisma.position.count({ where: { isDeleted: false } }),
    ]);
    return { data, total, page };
});
exports.getallPosition = getallPosition;
const addPosition = (position) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingPosition = yield prisma_1.prisma.position.findUnique({
            where: { position: position },
        });
        if (existingPosition) {
            throw new BadRequestError_1.default({
                code: 400,
                message: "Position already exists",
                context: { position },
            });
        }
        return yield prisma_1.prisma.position.create({
            data: {
                position: position,
            },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addPosition = addPosition;
const updatePosition = (id, position) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.position.update({
        where: { id },
        data: { position },
    });
});
exports.updatePosition = updatePosition;
const deletePosition = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.position.update({ where: { id }, data });
});
exports.deletePosition = deletePosition;

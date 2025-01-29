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
const BadRequestError_1 = __importDefault(require("../Error/BadRequestError"));
const Cagetory_service_1 = require("../Services/Cagetory.service");
const schema_1 = require("../schema/schema");
exports.default = {
    getCategoryWorksList: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = yield (0, Cagetory_service_1.getallCagetoryWork)(Number(page), Number(limit));
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }),
    createCategoryWork: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isCategoryValid = (0, schema_1.validateAddCategoryWork)(req.body);
            if (!isCategoryValid) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Missing or invalid 'category' field",
                    context: schema_1.validateAddCategoryWork.errors || undefined,
                });
            }
            const newCategoryWork = yield (0, Cagetory_service_1.addCategoryWork)(req.body.category);
            res.status(201).json(newCategoryWork);
        }
        catch (error) {
            next(error);
        }
    }),
    updateCategoryWork: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const isCategoryValid = (0, schema_1.validateAddCategoryWork)(req.body);
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Invalid or missing 'id' field",
                    context: { id: req.params.id },
                });
            }
            else if (!isCategoryValid) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Missing or invalid 'category' field",
                    context: schema_1.validateAddCategoryWork.errors || undefined,
                });
            }
            const updatedCategoryWork = yield (0, Cagetory_service_1.updateCategoryWork)(Number(id), req.body.category);
            res.status(200).json(updatedCategoryWork);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteCategoryWork: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Invalid or missing 'id' field",
                    context: { id: req.params.id },
                });
            }
            const deletedCategory = yield (0, Cagetory_service_1.deleteCategoryWork)(Number(id), {
                isDeleted: true,
            });
            res.status(200).json(deletedCategory);
        }
        catch (error) {
            next(error);
        }
    }),
};

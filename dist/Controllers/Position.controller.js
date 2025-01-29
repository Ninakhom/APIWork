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
const Position_service_1 = require("../Services/Position.service");
const BadRequestError_1 = __importDefault(require("../Error/BadRequestError"));
const schema_1 = require("../schema/schema");
exports.default = {
    getPosition: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { page = 1, limit = 10 } = req.query;
            const position = yield (0, Position_service_1.getallPosition)(Number(page), Number(limit));
            res.status(200).json(position);
        }
        catch (error) {
            next(error);
        }
    }),
    createPosition: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isPositionValid = (0, schema_1.validatePosition)(req.body);
            if (!isPositionValid) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Missing or invalid 'position' field",
                    context: schema_1.validatePosition.errors || undefined,
                });
            }
            const newPosition = yield (0, Position_service_1.addPosition)(req.body.position);
            res.status(201).json(newPosition);
        }
        catch (error) {
            next(error);
        }
    }),
    updatePosition: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const isPositionValid = (0, schema_1.validatePosition)(req.body);
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Invalid or missing 'id' field",
                    context: { id },
                });
            }
            else if (!isPositionValid) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Missing or invalid 'position' field",
                    context: schema_1.validatePosition.errors || undefined,
                });
            }
            const updatedPosition = yield (0, Position_service_1.updatePosition)(Number(id), req.body.position);
            res.status(200).json(updatedPosition);
        }
        catch (error) {
            next(error);
        }
    }),
    deletePosition: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                throw new BadRequestError_1.default({
                    code: 400,
                    message: "Invalid or missing 'id' field",
                    context: { id },
                });
            }
            const deletedPosition = yield (0, Position_service_1.deletePosition)(Number(id), {
                isDeleted: true,
            });
            res.status(200).json(deletedPosition);
        }
        catch (error) {
            next(error);
        }
    }),
};

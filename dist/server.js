"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandle_middleware_1 = require("./Middleware/errorHandle.middleware"); // นำเข้า Error Handling Middleware
const index_1 = __importDefault(require("./Routes/index"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*", // ระวัง: ใช้ในการ development เท่านั้น
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Middleware ทั่วไป
app.use(express_1.default.json());
app.use(index_1.default);
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
// Route
app.get("/", (req, res) => {
    res.send("Hello world");
});
// Error Handling Middleware (วางไว้ล่างสุด)
app.use(errorHandle_middleware_1.errorHandler);
const Port = process.env.Port || 3000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

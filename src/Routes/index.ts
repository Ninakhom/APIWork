// /Route/index.ts
import categorywork from "./CategoryWork.Route";
import { authenticateToken, authorize } from "../Middleware/Auth.middleware";
import position from "./Position.Route";
import { Router } from "express";
import User from "./User.Route";

const router = Router();
router.use("/category", categorywork);
// router.use(
//   "/category",
//   authenticateToken,
//   authorize(["Student"]),
//   categorywork
// );
router.use("/position", authenticateToken, position);
router.use("/user", User);
export default router;

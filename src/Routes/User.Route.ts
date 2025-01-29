import { Router } from "express";
import User from "../Controllers/User.controller";

const router = Router();
router.post("/register", User.register);
router.post("/login", User.login);

export default router;

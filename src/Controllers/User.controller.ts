import { Request, Response, NextFunction } from "express";
import { validateRegister, validateLogin } from "../schema/schema"; // แยก Schema Validation
import BadRequestError from "../Error/BadRequestError";
import { register, login } from "../Services/User.service";

export default {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isValid = validateRegister(req.body); // ใช้ Schema สำหรับการลงทะเบียน
      if (!isValid) {
        throw new BadRequestError({
          code: 400,
          message: "Invalid or missing fields",
          context: validateRegister.errors || undefined,
        });
      }
      const { username, password, role } = req.body;
      const newUser = await register(username, password, role);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const isValid = validateLogin(req.body); // ใช้ Schema สำหรับการล็อกอิน
      if (!isValid) {
        throw new BadRequestError({
          code: 400,
          message: "Invalid or missing fields",
          context: validateLogin.errors || undefined,
        });
      }
      const { username, password } = req.body;
      const { accessToken, refreshToken } = await login(username, password); // ส่งคืน Token
      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
};

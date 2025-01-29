import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Unauthorized from "../Error/UnauthorizedError";
import ForbiddenError from "../Error/ForbiddenError";

interface JwtPayload {
  userId: string;
  role: string;
}

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new Unauthorized({
        code: 401,
        message: "Unauthorized",
        context: { message: "Token is missing" },
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    // ตรวจสอบ Token และดึงข้อมูลผู้ใช้
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded; // บันทึกข้อมูลผู้ใช้ใน Request
    next();
  } catch (error) {
    next(error);
  }
};
export const authorize = (roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new Unauthorized({
        code: 401,
        message: "Unauthorized",
        context: { message: "User information is missing" },
      });
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError({
        statusCode: 403, // ควรใช้ 403 สำหรับการห้ามเข้าถึง
        message: "Forbidden",
        context: { message: "Role is not allowed" },
      });
    }

    next();
  };
};

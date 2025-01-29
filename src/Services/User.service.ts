import { Role } from "@prisma/client";
import BadRequestError from "../Error/BadRequestError";
import { prisma } from "../lib/prisma";
import { User } from "../Types/Type";
import jwt from "jsonwebtoken"; // ใช้ jwt แทน Jwt
import bcrypt from "bcrypt"; // ใช้ bcrypt แทน Bcrypt

// กำหนด Secret Key และ Expiration Time
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET; // เปลี่ยนเป็นค่า Secret Key จริง
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET; // เปลี่ยนเป็นค่า Secret Key จริง
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // Access Token หมดอายุใน 15 นาที
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // Refresh Token หมดอายุใน 7 วัน

// ฟังก์ชันสำหรับสร้าง Token
function generateToken(user: User, secret: string, expiresIn: string): string {
  return jwt.sign({ userId: user.id, role: user.role }, secret, {
    expiresIn,
  });
}

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้
export const register = async (
  username: string,
  password: string,
  role: Role
): Promise<User> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new BadRequestError({
        code: 400,
        message: "User already exists",
        context: { username },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });
  } catch (error) {
    throw error;
  }
};

// ฟังก์ชันสำหรับล็อกอิน
export const login = async (
  username: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string; user: User }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new BadRequestError({
        code: 400,
        message: "User not found",
        context: { username },
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError({
        code: 400,
        message: "Invalid password",
      });
    }

    // สร้าง Access Token และ Refresh Token
    const accessToken = generateToken(
      user,
      ACCESS_TOKEN_SECRET as string,
      ACCESS_TOKEN_EXPIRES_IN
    );
    const refreshToken = generateToken(
      user,
      REFRESH_TOKEN_SECRET as string,
      REFRESH_TOKEN_EXPIRES_IN
    );

    return { accessToken, refreshToken, user };
  } catch (error) {
    throw error;
  }
};

// ฟังก์ชันสำหรับสร้าง Access Token ใหม่โดยใช้ Refresh Token
export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    // ตรวจสอบ Refresh Token
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET as string
    ) as {
      userId: string;
    };

    // ค้นหาผู้ใช้
    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.userId) },
    });
    if (!user) {
      throw new BadRequestError({
        code: 400,
        message: "User not found",
      });
    }

    // สร้าง Access Token ใหม่
    return generateToken(
      user,
      ACCESS_TOKEN_SECRET as string,
      ACCESS_TOKEN_EXPIRES_IN
    );
  } catch (error) {
    throw new BadRequestError({
      code: 400,
      message: "Invalid refresh token",
    });
  }
};

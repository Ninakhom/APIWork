import BadRequestError from "../Error/BadRequestError";
import { CategoryWork } from "../Types/Type";
import { prisma } from "../lib/prisma";
export const getallCagetoryWork = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: CategoryWork[]; total: number; page: number }> => {
  const skip = (page - 1) * limit;
  // skip: จำนวนรายการที่ต้อง "ข้าม" ก่อนที่จะเริ่มดึงข้อมูลในหน้าปัจจุบัน
  // ตัวอย่าง:
  // ถ้าอยู่หน้า 1: (1 - 1) * 10 = 0 → ไม่ข้ามรายการใดเลย
  // ถ้าอยู่หน้า 2: (2 - 1) * 10 = 10 → ข้าม 10 รายการแรก
  // ถ้าอยู่หน้า 3: (3 - 1) * 10 = 20 → ข้าม 20 รายการแรก
  const [data, total] = await Promise.all([
    prisma.cagetoryWork.findMany({
      where: { isDeleted: false },
      skip,
      take: limit,
    }),
    prisma.cagetoryWork.count({ where: { isDeleted: false } }),
  ]);
  return { data, total, page };
};
export const addCategoryWork = async (
  category: string // แก้ไข Type ให้รับ string
): Promise<CategoryWork> => {
  try {
    // ตรวจสอบว่ามี category นี้อยู่แล้วหรือไม่
    const existingCategory = await prisma.cagetoryWork.findUnique({
      where: { category: category },
    });

    // ถ้ามี category ซ้ำกันอยู่แล้ว ให้ส่งข้อผิดพลาด
    if (existingCategory) {
      throw new BadRequestError({
        code: 400,
        message: "Category already exists",
        context: { category },
      });
    }

    // ถ้าไม่มี category ซ้ำกัน ให้สร้างข้อมูลใหม่
    return await prisma.cagetoryWork.create({
      data: {
        category: category,
      },
    });
  } catch (error) {
    // ส่งข้อผิดพลาดไปยัง Controller
    throw error;
  }
};
export const updateCategoryWork = async (
  id: number,
  category: string
): Promise<CategoryWork> => {
  try {
    return await prisma.cagetoryWork.update({
      where: { id },
      data: { category },
    });
  } catch (error) {
    // ส่งข้อผิดพลาดไปยัง Controller
    throw error;
  }
};

export const deleteCategoryWork = async (
  id: number,
  data: { isDeleted: boolean }
): Promise<CategoryWork | null> => {
  try {
    return await prisma.cagetoryWork.update({ where: { id }, data });
  } catch (error) {
    throw error;
  }
};

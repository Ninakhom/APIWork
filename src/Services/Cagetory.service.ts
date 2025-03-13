import BadRequestError from "../Error/BadRequestError";
import { JobCategory } from "../Types/Type";
import { prisma } from "../lib/prisma";
export const getallCagetoryWork = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: JobCategory[]; total: number; page: number }> => {
  // Calculate the number of items to skip
  const skip = (page - 1) * limit;

  // Fetch data and total count concurrently
  const [data, total] = await Promise.all([
    prisma.jobCategory.findMany({
      skip,
      take: limit,
    }),
    prisma.jobCategory.count(),
  ]);

  // Return the result
  return { data, total, page };
};
export const addCategoryWork = async (
  category: string,
  categoryicon: string // แก้ไข Type ให้รับ string
): Promise<JobCategory> => {
  try {
    // ตรวจสอบว่ามี category นี้อยู่แล้วหรือไม่
    const existingCategory = await prisma.jobCategory.findUnique({
      where: { JobCategoryName: category },
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
    return await prisma.jobCategory.create({
      data: { JobCategoryName: category, JobCategoryIcon: categoryicon }, // แก้ไข Type ให้รับ string
    });
  } catch (error) {
    // ส่งข้อผิดพลาดไปยัง Controller
    throw error;
  }
};
export const updateCategoryWork = async (
  id: number,
  category: string,
  categoryicon: string // แก้ไข Type ให้รับ string
): Promise<JobCategory> => {
  try {
    return await prisma.jobCategory.update({
      where: { JobCategoryId: id },
      data: { JobCategoryName: category, JobCategoryIcon: categoryicon },
    });
  } catch (error) {
    // ส่งข้อผิดพลาดไปยัง Controller
    throw error;
  }
};

export const deleteCategoryWork = async (
  id: number,
  data: { isDeleted: boolean }
): Promise<JobCategory | null> => {
  try {
    return await prisma.jobCategory.update({
      where: { JobCategoryId: id },
      data,
    });
  } catch (error) {
    throw error;
  }
};

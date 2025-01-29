import { Position } from "../Types/Type";
import { prisma } from "../lib/prisma";
import BadRequestError from "../Error/BadRequestError";
export const getallPosition = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: Position[]; total: number; page: number }> => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.position.findMany({
      where: { isDeleted: false },
      skip,
      take: limit,
    }),
    prisma.position.count({ where: { isDeleted: false } }),
  ]);
  return { data, total, page };
};
export const addPosition = async (position: string): Promise<Position> => {
  try {
    const existingPosition = await prisma.position.findUnique({
      where: { position: position },
    });

    if (existingPosition) {
      throw new BadRequestError({
        code: 400,
        message: "Position already exists",
        context: { position },
      });
    }

    return await prisma.position.create({
      data: {
        position: position,
      },
    });
  } catch (error) {
    throw error;
  }
};
export const updatePosition = async (
  id: number,
  position: string
): Promise<Position | null> => {
  return await prisma.position.update({
    where: { id },
    data: { position },
  });
};
export const deletePosition = async (
  id: number,
  data: { isDeleted: boolean }
): Promise<Position | null> => {
  return await prisma.position.update({ where: { id }, data });
};

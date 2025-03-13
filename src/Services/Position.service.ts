import { Position } from "../Types/Type";
import { prisma } from "../lib/prisma";
import BadRequestError from "../Error/BadRequestError";
export const getallPosition = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: Position[]; total: number; page: number }> => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.jobPosition.findMany({
      skip,
      take: limit,
    }),
    prisma.jobPosition.count(),
  ]);
  return { data, total, page };
};
export const addPosition = async (position: string): Promise<Position> => {
  try {
    const existingPosition = await prisma.jobPosition.findUnique({
      where: { JobPositionName: position },
    });

    if (existingPosition) {
      throw new BadRequestError({
        code: 400,
        message: "Position already exists",
        context: { position },
      });
    }

    return await prisma.jobPosition.create({
      data: {
        JobPositionName: position,
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
  return await prisma.jobPosition.update({
    where: { JobPositionId: id },
    data: { JobPositionName: position },
  });
};
export const deletePosition = async (
  id: number,
  data: { isDeleted: boolean }
): Promise<Position | null> => {
  return await prisma.jobPosition.update({
    where: { JobPositionId: id },
    data,
  });
};

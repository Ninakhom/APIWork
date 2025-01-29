import { prisma } from "../lib/prisma";
import { User } from "../Types/Type";
export const approveUser = async (
  id: number,
  data: { aproveUser: boolean }
): Promise<User | null> => {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (error) {
    throw error;
  }
};

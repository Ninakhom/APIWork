import { Role } from "@prisma/client";

export interface JobCategory {
  JobCategoryId: number;
  JobCategoryName: string;
  JobCategoryIcon: string;
}
export interface Position {
  id: number;
  position: string;
  isDeleted: boolean;
}
export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  aproveUser: boolean;
}

import { Role } from "@prisma/client";

export interface CategoryWork {
  id: number;
  category: string;
  isDeleted: boolean;
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

import type { Employee } from "../types/__generated__/graphql";

export type ModalState =
  | { type: "create" }
  | { type: "read"; employeeId: string }
  | { type: "update"; employeeId: string }
  | { type: "delete"; employeeId: string }
  | null;

export type EmployeeT = Omit<Employee, "__typename" | "id">;

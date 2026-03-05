import type { Unit } from "../types/__generated__/graphql";

export type ModalState =
  | { type: "create" }
  | { type: "read"; unitId: string }
  | { type: "update"; unitId: string }
  | { type: "delete"; unitId: string }
  | null;

export type UnitT = Omit<Unit, "__typename" | "id">;

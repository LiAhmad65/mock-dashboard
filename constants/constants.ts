import type { DropdownOption } from "@/app/components/dropdown/Dropdown";

export enum Status {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}

export const statusFilterOptions: DropdownOption[] = [
  { label: "All", value: "all" },
  { label: Status.ALIVE, value: Status.ALIVE },
  { label: Status.DEAD, value: Status.DEAD },
  { label: Status.UNKNOWN, value: Status.UNKNOWN },
];

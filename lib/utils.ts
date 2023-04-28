import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string) {
  switch (status) {
    case "waiting":
      return "bg-yellow-300";
    case "in-progress":
      return "bg-blue-500";
    case "done":
      return "bg-emerald-500";
    default:
      return "bg-neutral-200";
  }
}

export function getStatusText(status: string) {
  switch (status) {
    case "waiting":
      return "Waiting";
    case "in-progress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return "Unknown";
  }
}

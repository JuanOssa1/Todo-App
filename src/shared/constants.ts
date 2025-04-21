export type TaskPriorityType = "High" | "Medium" | "Low" | "";
export type TaskStatusType = "Complete" | "Pending" | "";
export enum TaskPriority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Empty = "None"
}
export enum TaskState {
  Complete = "Complete",
  Pending = "Pending",
  Empty = "None"
}
export const drawerWidth = 240;

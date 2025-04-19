import { Dayjs } from "dayjs";

type TaskStatus = "Complete" | "Pending";
export interface StatusItemProps {
  taskStatus: TaskStatus;
}
export interface TaskFormData {
  taskName: string;
  taskPriority?: string;
  taskState?: string;
  taskDescription?: string;
  taskAssignedTo?: string;
  taskCreationDate?: Dayjs;
  taskEndDate?: Dayjs;
}

export interface TaskItemProps {
  priority: string;
  taskState: TaskStatus;
}

import { Dayjs } from "dayjs";
import { TaskPriorityType } from "../../shared/constants";

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
export interface Task extends TaskFormData {
  taskId: string;
  projectId: string;
}

export interface TaskItemProps {
  priority: TaskPriorityType;
  taskState: TaskStatus;
}

import { Dayjs } from "dayjs";
import { TaskStatusType } from "../../shared/constants";
import { TaskPriorityType } from "../../shared/constants";
export interface StatusItemProps {
  taskStatus?: TaskStatusType;
}
export interface TaskFormData {
  taskName: string;
  taskPriority?: TaskPriorityType;
  taskState?: TaskStatusType;
  taskDescription?: string;
  taskAssignedTo?: string;
  taskCreationDate?: Dayjs;
  taskEndDate?: Dayjs;
}
export interface Task {
  taskName: string;
  taskPriority?: TaskPriorityType;
  taskState?: TaskStatusType;
  taskDescription?: string;
  taskAssignedTo?: string;
  taskCreationDate?: string;
  taskEndDate?: string;
  taskId: string;
  projectId: string;
}

export interface ParsedTaskType {
  taskName: string;
  taskPriority?: TaskPriorityType;
  taskState?: TaskStatusType;
  taskDescription?: string;
  taskAssignedTo?: string;
  taskCreationDate?: string;
  taskEndDate?: string;
  taskId: string;
  projectId: string;
}

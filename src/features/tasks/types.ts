import { Dayjs } from "dayjs";

export interface TaskFormData {
  taskName: string;
  taskPriority?: string;
  taskState?: string;
  taskDescription?: string;
  taskAssignedTo?: string;
  taskCreationDate?: Dayjs;
  taskEndDate?: Dayjs;
}

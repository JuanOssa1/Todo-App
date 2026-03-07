import { Dayjs } from "dayjs";
import { TaskPriorityType, TaskStatusType } from "../../shared/constants";

export interface TaskFormData {
  taskName: string;
  taskPriority: TaskPriorityType;
  taskState: TaskStatusType;
  taskDescription: string;
  taskAssignedTo: string;
  taskCreationDate?: Dayjs;
  taskEndDate?: Dayjs;
}
export interface Task {
  taskName: string;
  taskPriority: TaskPriorityType;
  taskState: TaskStatusType;
  taskDescription?: string;
  taskAssignedTo?: string;
  taskCreationDate?: string;
  taskEndDate?: string;
  taskId: string;
  projectId: string;
}

export interface ParsedTaskType {
  taskName: string;
  taskPriority: TaskPriorityType;
  taskState: TaskStatusType;
  taskDescription?: string;
  taskAssignedTo?: string;
  taskCreationDate?: string;
  taskEndDate?: string;
  taskId: string;
  projectId: string;
}

export interface CreateTaskInput {
  name: string;
  description: string;
  assignedTo: string;
  priority: TaskPriorityType;
  state: TaskStatusType;
  endDate?: string;
  projectId: string;
}
export interface UpdateTaskInput {
  name: string;
  description: string;
  assignedTo: string;
  priority: TaskPriorityType;
  state: TaskStatusType;
  endDate?: string;
}

export interface TaskResponse {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  priority: TaskPriorityType;
  state: TaskStatusType;
  creationDate: string;
  endDate?: string;
  projectId: string;
}

export interface CreateTaskResponse {
    createTask: TaskResponse;
}
export interface UpdateTaskResponse {
    updateTask: TaskResponse; 
}
export interface GetTaskResponse {
    task: TaskResponse; 
}
export interface GetProjectTasksResponse {
    tasks: TaskResponse[]; 
}






import { Task, TaskFormData, CreateTaskInput, UpdateTaskInput, TaskResponse } from "./types";

export const mapTaskResponseToTask = (response: TaskResponse): Task => ({
  taskId: response.id,
  taskName: response.name,
  taskDescription: response.description,
  taskAssignedTo: response.assignedTo,
  taskPriority: response.priority,
  taskState: response.state,
  taskCreationDate: response.creationDate,
  taskEndDate: response.endDate,
  projectId: response.projectId
});

export const mapProjectFormDataToCreateProjectInput = (formData: TaskFormData, projectId: string): CreateTaskInput => ({
    name: formData.taskName,
    description: formData.taskDescription,
    assignedTo: formData.taskAssignedTo,
    priority: formData.taskPriority,
    state: formData.taskState,
    endDate: formData.taskEndDate ? formData.taskEndDate.toISOString() : undefined,
    projectId
});

export const mapProjectFormDataToUpdateProjectInput = (formData: TaskFormData, projectId: string): UpdateTaskInput => ({
    name: formData.taskName,
    description: formData.taskDescription,
    assignedTo: formData.taskAssignedTo,
    priority: formData.taskPriority,
    state: formData.taskState,
    endDate: formData.taskEndDate ? formData.taskEndDate.toISOString() : undefined,
});

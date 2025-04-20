import { DocumentData } from "firebase/firestore/lite";
import { Task } from "./types";

export const parseTask = (doc: DocumentData) => {
  const task: Task = {
    projectId: doc.data().projectId,
    taskAssignedTo: doc.data().taskAssignedTo,
    taskCreationDate: doc.data().taskCreationDate,
    taskDescription: doc.data().taskDescription,
    taskEndDate: doc.data().taskEndDate,
    taskId: doc.data().taskId,
    taskName: doc.data().taskName,
    taskPriority: doc.data().taskPriority,
    taskState: doc.data().taskState
  };
  return task;
};

export const parseDbTask = (task: Task) => {
  const parsedTask = {
    taskName: task.taskName,
    taskPriority: task.taskPriority,
    taskState: task.taskState,
    taskDescription: task.taskDescription,
    taskAssignedTo: task.taskAssignedTo,
    taskCreationDate: task.taskCreationDate?.toDate().toDateString(),
    taskEndDate: task.taskEndDate?.toDate().toLocaleDateString(),
    taskId: task.taskId,
    projectId: task.projectId!
  };
  return parsedTask;
};

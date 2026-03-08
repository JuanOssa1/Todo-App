import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { Task } from "./types";

interface TaskSliceState {
  tasks: Task[];
  taskSort: boolean;
  taskPriority?: string;
  taskState?: string;
  taskOrder: "desc" | "asc";
  taskActive?: Task;
  taskBeingEdited: boolean;
}

const initialTaskState: TaskSliceState = {
  tasks: [],
  taskSort: false,
  taskPriority: "All",
  taskState: "All",
  taskOrder: "desc",
  taskActive: {
    taskId: "",
    projectId: "",
    taskName: "",
    taskPriority: "",
    taskState: ""
  },
  taskBeingEdited: false
};

export const taskSlice = createAppSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: create => ({
    addTask: create.reducer((state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    }),
    setTasks: create.reducer((state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    }),
    setTask: create.reducer((state, action: PayloadAction<Task>) => {
      state.taskActive = action.payload;
    }),
    sortTasks: create.reducer(state => {
      state.taskSort = !state.taskSort;
      state.taskOrder = state.taskSort ? "desc" : "asc";
    }),
    isEditing: create.reducer((state, action: PayloadAction<boolean>) => {
      state.taskBeingEdited = action.payload;
    }),
    setFilters: create.reducer(
      (
        state,
        action: PayloadAction<{ taskPriority?: string; taskState?: string }>
      ) => {
        state.taskPriority = action.payload.taskPriority;
        state.taskState = action.payload.taskState;
      }
    ),
  }),

  selectors: {
    selectTaskList: task => task.tasks,
    selectActiveTsk: task => task.taskActive,
    selectTaskIsEditing: task => task.taskBeingEdited,
    selectFilters: task => ({
      taskPriority: task.taskPriority,
      taskState: task.taskState
    }),
    selectOrder: task => task.taskOrder
  }
});

export const {
  addTask,
  setTasks,
  setFilters,
  sortTasks,
  setTask,
  isEditing
} = taskSlice.actions;

export const {
  selectTaskList,
  selectActiveTsk,
  selectTaskIsEditing,
  selectFilters,
  selectOrder
} = taskSlice.selectors;

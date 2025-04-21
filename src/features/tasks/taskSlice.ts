import { PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where
} from "firebase/firestore/lite";
import db from "../../db/firestore";
import { createAppSlice } from "../../app/createAppSlice";
import { Task } from "./types";
import { RootState } from "../../app/store";
import { parseTask } from "./parser";

interface TaskSliceState {
  tasks: Task[];
  tasksAreLoaded: boolean;
  taskSort: boolean;
  taskPriority?: string;
  taskState?: string;
  taskOrder: "desc" | "asc";
  taskActive?: Task;
  taskBeingEdited: boolean;
}

const initialTaskState: TaskSliceState = {
  tasks: [],
  tasksAreLoaded: false,
  taskSort: false,
  taskPriority: "All",
  taskState: "All",
  taskOrder: "desc",
  taskActive: {
    taskId: "",
    projectId: "",
    taskName: ""
  },
  taskBeingEdited: false
};

interface filterThunk {
  taskPriority?: string;
  taskState?: string;
  projectId?: string;
}
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
    markTasksAsLoaded: create.reducer(state => {
      state.tasksAreLoaded = true;
    }),
    getTask: create.asyncThunk(async (taskId: string, thunkAPI) => {
      const task = await getDoc(doc(db, "tasks", taskId));
      const parsedTask = parseTask(task);
      thunkAPI.dispatch(setTask(parsedTask));
    }),
    removeDbTask: create.asyncThunk(async (taskId: string) => {
      await deleteDoc(doc(db, "tasks", taskId));
    }),
    addDbTask: create.asyncThunk(async (task: Task) => {
      await setDoc(doc(db, "tasks", task.taskId), task);
    }),
    sortDbTask: create.asyncThunk(async (projectId: string, thunkAPI) => {
      const sortedTasks: Task[] = [];
      const state = thunkAPI.getState() as RootState;
      const order = state.tasks.taskSort ? "desc" : "asc";
      const queryConstraints = [];
      if (state.tasks.taskPriority != "All")
        queryConstraints.push(
          where("taskPriority", "==", state.tasks.taskPriority)
        );
      if (state.tasks.taskState != "All")
        queryConstraints.push(
          where("taskState", "==", state.tasks.taskPriority)
        );

      const getProjectsQuery = query(
        collection(db, "tasks"),
        where("projectId", "==", projectId),
        orderBy("projectId", order)
      );
      const querySnapshot = await getDocs(getProjectsQuery);
      querySnapshot.forEach(doc => {
        const task = parseTask(doc);
        sortedTasks.push(task);
      });

      thunkAPI.dispatch(setTasks(sortedTasks));
    }),
    filterDbTask: create.asyncThunk(async (filters: filterThunk, thunkAPI) => {
      const filteredTasks: Task[] = [];
      const state = thunkAPI.getState() as RootState;
      const { projectId, taskPriority, taskState } = filters;
      const queryConstraints = [];
      console.log(taskPriority, taskState, state.tasks.taskOrder, projectId);

      if (taskPriority != "All")
        queryConstraints.push(where("taskPriority", "==", taskPriority));
      if (taskState != "All")
        queryConstraints.push(where("taskState", "==", taskState));
      const getProjectsQuery = query(
        collection(db, "tasks"),
        where("projectId", "==", projectId),
        ...queryConstraints
        //orderBy("projectId", state.tasks.taskOrder!) Don't remove I need to create firestore indexes
      );

      const querySnapshot = await getDocs(getProjectsQuery);
      querySnapshot.forEach(doc => {
        const task = parseTask(doc);
        filteredTasks.push(task);
      });
      console.log(filteredTasks);

      thunkAPI.dispatch(setTasks(filteredTasks));
    })
  }),

  selectors: {
    selectTaskList: task => task.tasks,
    selectTaskIsLoaded: task => task.tasksAreLoaded,
    selectActiveTsk: task => task.taskActive,
    selectTaskIsEditing: task => task.taskBeingEdited
  }
});

export const {
  addTask,
  setTasks,
  markTasksAsLoaded,
  removeDbTask,
  addDbTask,
  sortDbTask,
  filterDbTask,
  setFilters,
  sortTasks,
  getTask,
  setTask,
  isEditing
} = taskSlice.actions;

export const {
  selectTaskIsLoaded,
  selectTaskList,
  selectActiveTsk,
  selectTaskIsEditing
} = taskSlice.selectors;

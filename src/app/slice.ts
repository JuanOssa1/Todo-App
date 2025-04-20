import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../features/projects/types";
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
import db from "../db/firestore";
import { createAppSlice } from "./createAppSlice";
import { Task } from "../features/tasks/types";
import { RootState } from "./store";
import { parseTask } from "../features/tasks/parser";

interface ProjectSliceState {
  projects: Project[];
  isLoaded: boolean;
  selectedProject?: Project;
  currentProject?: Project;
}
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
const initialModalState = { isOpen: false };

const initialProjectState: ProjectSliceState = {
  projects: [],
  isLoaded: false,
  selectedProject: undefined
};

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

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: create => ({
    open: create.reducer(state => {
      state.isOpen = true;
    }),
    close: create.reducer(state => {
      state.isOpen = false;
    })
  }),
  selectors: {
    selectOpen: modal => modal.isOpen
  }
});

export const projectSlice = createSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: create => ({
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    setProjects: create.reducer((state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    }),
    selectProject: create.reducer(
      (state, action: PayloadAction<string | undefined>) => {
        state.selectedProject = state.projects.find(
          project => project.projectId === action.payload
        );
        if (!action.payload) {
          state.selectedProject = undefined;
        }
      }
    ),

    editProject: create.reducer(
      (state, action: PayloadAction<Project | undefined>) => {
        const index = state.projects.findIndex(
          project => project.projectId === action.payload?.projectId
        );
        if (index !== -1) {
          state.projects[index] = {
            ...state.projects[index],
            ...action.payload
          };
        }
      }
    ),
    removeProject: create.reducer((state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        project => project.projectId !== action.payload
      );
    }),
    markAsLoaded: create.reducer(state => {
      state.isLoaded = true;
    })
  }),
  selectors: {
    selectProjectList: project => project.projects,
    selectIsLoaded: project => project.isLoaded,
    selectSelectedProject: project => project.selectedProject,
    selectCurrentProject: project => project.currentProject
  }
});
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

interface addDbProject {
  currentProjectId: string;
  project: Project;
}
export const asyncProjectSlice = createAppSlice({
  name: "projectDb",
  initialState: {},
  reducers: create => ({
    removeDbProject: create.asyncThunk(async (projectId: string) => {
      await deleteDoc(doc(db, "projects", projectId));
    }),
    addDbProject: create.asyncThunk(async (values: addDbProject) => {
      const { currentProjectId, project } = values;
      await setDoc(doc(db, "projects", currentProjectId), project);
    })
  })
});

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    project: projectSlice.reducer,
    tasks: taskSlice.reducer,
    projectDb: asyncProjectSlice.reducer
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
export const { removeDbProject, addDbProject } = asyncProjectSlice.actions;
export const { open, close } = modalSlice.actions;
export const {
  addProject,
  setProjects,
  markAsLoaded,
  selectProject,
  editProject,
  removeProject
} = projectSlice.actions;

export const {
  selectTaskIsLoaded,
  selectTaskList,
  selectActiveTsk,
  selectTaskIsEditing
} = taskSlice.selectors;
export const {
  selectProjectList,
  selectIsLoaded,
  selectSelectedProject,
  selectCurrentProject
} = projectSlice.selectors;
export const { selectOpen } = modalSlice.selectors;

export default store;

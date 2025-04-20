import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../features/projects/types";
import { deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import db from "../db/firestore";
import { createAppSlice } from "./createAppSlice";
import { Task } from "../features/tasks/types";

interface ProjectSliceState {
  projects: Project[];
  isLoaded: boolean;
  selectedProject?: Project;
}
interface TaskSliceState {
  tasks: Task[];
  tasksAreLoaded: boolean;
}
const initialModalState = { isOpen: false };

const initialProjectState: ProjectSliceState = {
  projects: [],
  isLoaded: false,
  selectedProject: undefined
};

const initialTaskState: TaskSliceState = {
  tasks: [],
  tasksAreLoaded: false
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
    selectCurrentProject: project => project.selectedProject
  }
});

export const taskSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: create => ({
    addTask: create.reducer((state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    }),
    setTasks: create.reducer((state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    }),
    markTasksAsLoaded: create.reducer(state => {
      state.tasksAreLoaded = true;
    })
  }),
  selectors: {
    selectTaskList: task => task.tasks,
    selectTaskIsLoaded: task => task.tasksAreLoaded
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
export const asyncTaskSlice = createAppSlice({
  name: "taskDb",
  initialState: {},
  reducers: create => ({
    removeDbTask: create.asyncThunk(async (taskId: string) => {
      await deleteDoc(doc(db, "tasks", taskId));
    }),
    addDbTask: create.asyncThunk(async (task: Task) => {
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
      console.log("On the reducer", parsedTask);
      await setDoc(doc(db, "tasks", task.taskId), parsedTask);
    })
  })
});

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    project: projectSlice.reducer,
    tasks: taskSlice.reducer,
    projectDb: asyncProjectSlice.reducer,
    taskDb: asyncTaskSlice.reducer
  }
});
export const { addTask, setTasks, markTasksAsLoaded } = taskSlice.actions;
export const { removeDbProject, addDbProject } = asyncProjectSlice.actions;
export const { removeDbTask, addDbTask } = asyncTaskSlice.actions;
export const { open, close } = modalSlice.actions;
export const {
  addProject,
  setProjects,
  markAsLoaded,
  selectProject,
  editProject,
  removeProject
} = projectSlice.actions;

export const { selectTaskIsLoaded, selectTaskList } = taskSlice.selectors;
export const { selectProjectList, selectIsLoaded, selectCurrentProject } =
  projectSlice.selectors;
export const { selectOpen } = modalSlice.selectors;

export default store;

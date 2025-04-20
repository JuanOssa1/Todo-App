import {
  createSlice,
  configureStore,
  PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { Project } from "../features/projects/types";
import { deleteDoc, doc } from "firebase/firestore/lite";
import db from "../db/firestore";
import { createAppSlice } from "./createAppSlice";

interface ProjectSliceState {
  projects: Project[];
  isLoaded: boolean;
  selectedProject?: Project;
}
const initialModalState = { isOpen: false };

const initialProjectState: ProjectSliceState = {
  projects: [],
  isLoaded: false,
  selectedProject: undefined
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

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string, { dispatch }) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      dispatch(removeProject(projectId));
    } catch (error) {
      console.error(error);
    }
  }
);
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

const initialDeleteState = {
  projects: [],
  isLoaded: false,
  selectedProject: undefined
};
export const asyncProjectSlice = createAppSlice({
  name: "deleteProject",
  initialState: initialDeleteState,
  reducers: create => ({
    removeDbProject: create.asyncThunk(async (projectId: string) => {
      await deleteDoc(doc(db, "projects", projectId));
    })
  })
});

const store = configureStore({
  reducer: { modal: modalSlice.reducer, project: projectSlice.reducer }
});

export const { removeDbProject } = asyncProjectSlice.actions;
export const { open, close } = modalSlice.actions;
export const {
  addProject,
  setProjects,
  markAsLoaded,
  selectProject,
  editProject,
  removeProject
} = projectSlice.actions;

export const { selectProjectList, selectIsLoaded, selectCurrentProject } =
  projectSlice.selectors;
export const { selectOpen } = modalSlice.selectors;

export default store;

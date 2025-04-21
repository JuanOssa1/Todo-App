import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./types";
import { deleteDoc, doc, setDoc } from "@firebase/firestore/lite";
import { createAppSlice } from "../../app/createAppSlice";
import db from "../../db/firestore";

interface ProjectSliceState {
  projects: Project[];
  isLoaded: boolean;
  selectedProject?: Project;
  currentProject?: Project;
}
const initialProjectState: ProjectSliceState = {
  projects: [],
  isLoaded: false,
  selectedProject: undefined
};
interface addDbProject {
  currentProjectId: string;
  project: Project;
}

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

export const {
  addProject,
  setProjects,
  markAsLoaded,
  selectProject,
  editProject,
  removeProject
} = projectSlice.actions;
export const {
  selectProjectList,
  selectIsLoaded,
  selectSelectedProject,
  selectCurrentProject
} = projectSlice.selectors;
export const { removeDbProject, addDbProject } = asyncProjectSlice.actions;

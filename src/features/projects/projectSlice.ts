import { PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./types";
import { createAppSlice } from "../../app/createAppSlice";

interface ProjectSliceState {
  projects: Project[];
  isLoaded: boolean;
  selectedProject?: Project;
  currentProject?: Project;
  projectLoading: boolean;
}
const initialProjectState: ProjectSliceState = {
  projects: [],
  isLoaded: false,
  selectedProject: undefined,
  projectLoading: false
};

export const projectSlice = createAppSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: create => ({
    addProject: create.reducer((state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    }),
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
    setProjectLoading: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.projectLoading = action.payload;
      }
    ),
  }),
  selectors: {
    selectProjectList: project => project.projects,
    selectSelectedProject: project => project.selectedProject,
    selectCurrentProject: project => project.currentProject,
    selectLoadingProject: project => project.projectLoading
  }
});

export const {
  addProject,
  setProjects,
  selectProject,
  editProject,
  removeProject,
  setProjectLoading
} = projectSlice.actions;

export const {
  selectProjectList,
  selectSelectedProject,
  selectCurrentProject,
  selectLoadingProject
} = projectSlice.selectors;

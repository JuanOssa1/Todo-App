import { PayloadAction } from "@reduxjs/toolkit";
import { Project } from "./types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc
} from "@firebase/firestore/lite";
import { createAppSlice } from "../../app/createAppSlice";
import db from "../../db/firestore";
import { parseProject } from "./parser";

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
interface addDbProject {
  currentProjectId: string;
  project: Project;
}

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
    markAsLoaded: create.reducer(state => {
      state.isLoaded = true;
    }),
    removeDbProject: create.asyncThunk(async (projectId: string, thunkAPI) => {
      try {
        thunkAPI.dispatch(setProjectLoading(true));
        await deleteDoc(doc(db, "projects", projectId));
      } catch (error) {
        console.log(error);
      } finally {
        thunkAPI.dispatch(setProjectLoading(false));
      }
    }),
    addDbProject: create.asyncThunk(async (values: addDbProject, thunkAPI) => {
      const { currentProjectId, project } = values;
      try {
        thunkAPI.dispatch(setProjectLoading(true));
        await setDoc(doc(db, "projects", currentProjectId), project);
      } catch (error) {
        console.log(error);
      } finally {
        thunkAPI.dispatch(setProjectLoading(false));
      }
    }),
    setDbProjects: create.asyncThunk(async (_, thunkAPI) => {
      const projects: Project[] = [];
      const getProjectsQuery = query(collection(db, "projects"));
      try {
        thunkAPI.dispatch(setProjectLoading(true));
        const querySnapshot = await getDocs(getProjectsQuery);
        querySnapshot.forEach(doc => {
          const project = parseProject(doc);
          projects.push(project);
        });
        thunkAPI.dispatch(setProjects(projects));
      } catch (error) {
        console.log(error);
      } finally {
        thunkAPI.dispatch(setProjectLoading(false));
      }
    })
  }),
  selectors: {
    selectProjectList: project => project.projects,
    selectIsLoaded: project => project.isLoaded,
    selectSelectedProject: project => project.selectedProject,
    selectCurrentProject: project => project.currentProject,
    selectLoadingProject: project => project.projectLoading
  }
});

export const {
  addProject,
  setProjects,
  markAsLoaded,
  selectProject,
  editProject,
  removeProject,
  removeDbProject,
  addDbProject,
  setDbProjects,
  setProjectLoading
} = projectSlice.actions;
export const {
  selectProjectList,
  selectIsLoaded,
  selectSelectedProject,
  selectCurrentProject,
  selectLoadingProject
} = projectSlice.selectors;

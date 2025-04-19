import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../features/projects/types";

interface ProjectSliceState {
  projects: Project[];
  isLoaded: boolean;
}
const initialModalState = { isOpen: false };

const initialProjectState: ProjectSliceState = {
  projects: [],
  isLoaded: false
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
    markAsLoaded: create.reducer(state => {
      state.isLoaded = true;
    })
  }),
  selectors: {
    selectProjectList: project => project.projects,
    selectIsLoaded: project => project.isLoaded
  }
});

const store = configureStore({
  reducer: { modal: modalSlice.reducer, project: projectSlice.reducer }
});

export const { open, close } = modalSlice.actions;
export const { selectOpen } = modalSlice.selectors;

export const { addProject, setProjects, markAsLoaded } = projectSlice.actions;
export const { selectProjectList, selectIsLoaded } = projectSlice.selectors;

export default store;

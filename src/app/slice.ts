import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialModalState = { isOpen: false };
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

const store = configureStore({ reducer: { modal: modalSlice.reducer } });

export const { open, close } = modalSlice.actions;
export const { selectOpen } = modalSlice.selectors;
export default store;

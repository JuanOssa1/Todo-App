import { createSlice, configureStore } from "@reduxjs/toolkit";

const baseSlice = createSlice({
  name: "base",
  initialState: {},
  reducers: {}
});

const store = configureStore({ reducer: { base: baseSlice.reducer } });

export const baseActions = baseSlice.actions;
export default store;

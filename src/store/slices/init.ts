import { createSlice } from '@reduxjs/toolkit';

export type InitType = boolean;

const initialState: InitType = false;

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    initialize: () => true,
  },
});

export const { initialize } = initSlice.actions;

export const init = initSlice.reducer;

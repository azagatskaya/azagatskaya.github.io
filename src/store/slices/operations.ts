import { createSlice } from '@reduxjs/toolkit';
import { createRandomOperations, Operation } from 'src/homeworks/ts1/3_write';

const initialState: Operation[] = createRandomOperations(10);

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation: (state, action) => {
      console.log('addOperation', action.payload);
      return [...state, action.payload];
    },
    updateOperation: (state, action) => {
      console.log('updateOperation', action.payload);
      const id: number = state.findIndex((op) => op.id === action.payload.id);
      return [...state.slice(0, id), action.payload, ...state.slice(id + 1)];
    },
    moreOperations: (state) => [...state, ...createRandomOperations(10)],
  },
});

export const { addOperation, updateOperation, moreOperations } = operationsSlice.actions;
export const operations = operationsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getId } from 'src/shared/mock/products';

const tokenSlice = createSlice({
  name: 'token',
  initialState: localStorage.getItem('token'),
  reducers: {
    generateToken: (_, action) => {
      const newToken = `${getId(14)}_${action.payload}`;
      localStorage.setItem('token', newToken);
      return newToken;
    },
  },
});

export const { generateToken } = tokenSlice.actions;
export const token = tokenSlice.reducer;

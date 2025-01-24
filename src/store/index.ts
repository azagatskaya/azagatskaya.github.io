import { configureStore } from '@reduxjs/toolkit';
import { init } from './slices/init';
import { token } from './slices/token';
import { profile } from './slices/profile';
import { operations } from './slices/operations';
export const store = configureStore({
  reducer: {
    token,
    init,
    profile,
    operations,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraParams = { url: string; version: string };

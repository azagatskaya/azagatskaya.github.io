import { configureStore } from '@reduxjs/toolkit';
import { init } from './slices/init';
import { token } from './slices/token';
import { profile } from './slices/profile';
export const store = configureStore({
  reducer: {
    token,
    init,
    profile,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraParams = { url: string; version: string };

import { configureStore } from '@reduxjs/toolkit';
import { init } from './slices/init';
import { operations } from './slices/operations';
import { SERVER_URL } from 'src/shared/config';
import { auth } from 'src/store/slices/auth';
import { categories } from 'src/store/slices/categories';

export const store = configureStore({
  reducer: {
    auth,
    categories,
    init,
    operations,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          url: SERVER_URL,
        },
      },
    }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraParams = { url: string; version: string };

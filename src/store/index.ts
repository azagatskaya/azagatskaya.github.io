import { configureStore } from '@reduxjs/toolkit';
import { init } from './slices/init';
import { operations } from './slices/operations';
import { SERVER_URL } from 'src/shared/config';
import { auth } from 'src/store/slices/auth';
import { authApi } from 'src/services/authentication';

export const store = configureStore({
  reducer: {
    auth,
    init,
    operations,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          url: SERVER_URL,
        },
      },
    }).concat(authApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraParams = { url: string; version: string };

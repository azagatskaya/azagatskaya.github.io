import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export enum RoleEnum {
  user = 0,
  admin = 1,
}

export type RoleType = RoleEnum.admin | RoleEnum.user | null;

export type AuthType = {
  email: string | null;
  password?: string | null;
  name?: string | null;
  about?: string | null;
  role: RoleType;
} | null;

import { ExtraParams } from 'src/store';
import { COMMAND_ID } from 'src/shared/config';
import { SignInBody } from 'src/shared/serverTypes';
import { saveTokenToLocalStorage } from 'src/shared/token';

export const signin = createAsyncThunk('auth/signin', async (authData: SignInBody, thunkAPI) => {
  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/signin`, {
      method: 'POST',
      body: JSON.stringify({ email: authData.email, password: authData.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (response?.token) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const signup = createAsyncThunk('auth/signup', async (authData: SignInBody, thunkAPI) => {
  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/signup`, {
      method: 'POST',
      body: JSON.stringify({ email: authData.email, password: authData.password, commandId: COMMAND_ID }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (response?.token) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const getProfile = createAsyncThunk('auth/getProfile', async (token: string, thunkAPI) => {
  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (response?.email) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState: AuthType = null;

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (_, action) => {
      return action.payload;
    },
    clearAuth: () => null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (_, action) => {
        saveTokenToLocalStorage(action.payload.token);
        const { email, name } = action.payload;
        return { email, role: 1, ...(name ? { name } : {}) };
      })
      .addCase(signup.fulfilled, (_, action) => {
        const { email } = action.payload.profile;
        saveTokenToLocalStorage(action.payload.token);
        return { email, role: 1 };
      })
      .addCase(getProfile.fulfilled, (_, action) => {
        const { email, name } = action.payload;
        return { email, role: 1, ...(name ? { name } : {}) };
      });
  },
});

export const { setAuth, clearAuth } = AuthSlice.actions;

export const auth = AuthSlice.reducer;

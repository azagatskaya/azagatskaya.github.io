import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from 'src/shared/serverTypes';
import { ExtraParams } from 'src/store';
import { getTokenFromLocalStorage } from 'src/shared/token';

export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if ('data' in response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const addCategory = createAsyncThunk('categories/addCategory', async ({ name }: { name: string }, thunkAPI) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/categories`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if ('id' in response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const deleteCategory = createAsyncThunk('categories/addCategory', async ({ id }: { id: string }, thunkAPI) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if ('id' in response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState: Category[] = [];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (_, action) => action.payload.data);
  },
});

export const categories = categoriesSlice.reducer;

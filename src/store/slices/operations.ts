import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DateRange,
  FilterType,
  GetPageArgsType,
  Operation,
  Pagination,
  SliderRange,
  Sorting,
} from 'src/shared/serverTypes';
import { getTokenFromLocalStorage } from 'src/shared/token';
import { AppState, ExtraParams } from 'src/store';
import { OperationFieldsType } from 'src/components/operation/operation-full/OperationFull';

const PAGE_SIZE = 8;

export const getMinMaxDates = (arr: Operation[]) => {
  const datesInMs = arr.map((op) => new Date(op.date).valueOf());
  const min = Math.min(...datesInMs);
  const max = Math.max(...datesInMs);

  return { min: new Date(min), max: new Date(max) };
};

export const getDateSliderValues = createAsyncThunk('operations/getDateSliderValues', async (_, thunkAPI) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/operations`, {
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

export const getOperations = createAsyncThunk('operations/getOperations', async (_, thunkAPI) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/operations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if ('data' in response) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const updateOperations = createAsyncThunk('operations/updateOperations', async (_, thunkAPI) => {
  const token = getTokenFromLocalStorage();
  const store = thunkAPI.getState() as AppState;

  const { pagination, sorting, date } = store.operations;

  const filter: FilterType = {
    pagination: JSON.stringify({
      pageSize: PAGE_SIZE * pagination.pageNumber,
      pageNumber: 1,
    }),
    sorting: JSON.stringify(sorting),
  };

  if (date) filter.date = JSON.stringify(date);

  try {
    const response = await fetch(
      `${(thunkAPI.extra as ExtraParams).url}/operations?${new URLSearchParams(filter).toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    if ('data' in response) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const getOperationsPage = createAsyncThunk(
  'operations/getOperationsPage',
  async ({ pageNumber, sorting, date = null }: GetPageArgsType, thunkAPI) => {
    const token = getTokenFromLocalStorage();

    const filter: FilterType = {
      pagination: JSON.stringify({
        pageSize: PAGE_SIZE,
        pageNumber,
      }),
      sorting: JSON.stringify(sorting),
    };

    if (date) filter.date = JSON.stringify(date);

    try {
      const response = await fetch(
        `${(thunkAPI.extra as ExtraParams).url}/operations?${new URLSearchParams(filter).toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());

      if ('data' in response) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.errors[0].extensions.code);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
  {
    condition: ({ pageNumber, sorting, date = null }: GetPageArgsType, thunkAPI) => {
      const store = thunkAPI.getState() as AppState;
      return store.operations?.state !== 'loading';
    },
  }
);

export const getOperation = createAsyncThunk('operations/getOperation', async (id: string, thunkAPI) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/operations/${id}`, {
      method: 'GET',
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

export const addOperation = createAsyncThunk('operations/addOperation', async (body: OperationFieldsType, thunkAPI) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/operations`, {
      method: 'POST',
      body: JSON.stringify(body),
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

export const updateOperation = createAsyncThunk(
  'operations/updateOperation',
  async ({ id, body }: { id: string; body: OperationFieldsType }, thunkAPI) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/operations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
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
  }
);

export const deleteOperation = createAsyncThunk(
  'operations/deleteOperation',
  async ({ id }: { id: string }, thunkAPI) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await fetch(`${(thunkAPI.extra as ExtraParams).url}/operations/${id}`, {
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
  }
);

type OperationsSliceType = {
  data: Operation[];
  currentOperation: Operation | null;
  pagination?: Pagination;
  sorting?: Sorting;
  date?: DateRange;
  sliderRange?: SliderRange;
  state?: string;
};

const initialState: OperationsSliceType = {
  data: [] as Operation[],
  currentOperation: null,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    clearCurrentOperation: (state) => ({ ...state, currentOperation: null }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDateSliderValues.fulfilled, (status, action) => {
        const { min, max } = getMinMaxDates(action.payload.data);
        return { ...status, sliderRange: { min: min.toISOString(), max: max.toISOString() } };
      })
      .addCase(getOperations.fulfilled, (status, action) => ({ ...status, data: action.payload }))
      .addCase(getOperationsPage.pending, (status) => ({ ...status, state: 'loading' }))
      .addCase(getOperationsPage.fulfilled, (status, action) => {
        const { data, pagination, sorting, date } = action.payload;
        return pagination.pageNumber > 1
          ? {
              ...status,
              data: [...status.data, ...data],
              pagination,
              sorting,
              date,
              state: 'idle',
            }
          : { ...status, data: data, pagination, sorting, date, state: 'idle' };
      })
      .addCase(updateOperations.fulfilled, (status, action) => ({ ...status, data: action.payload.data }))
      .addCase(getOperation.fulfilled, (status, action) => ({ ...status, currentOperation: { ...action.payload } }))
      .addCase(addOperation.fulfilled, (status, action) => ({ ...status, currentOperation: { ...action.payload } }))
      .addCase(deleteOperation.fulfilled, (status) => ({ ...status, currentOperation: null }))
      .addCase(updateOperation.fulfilled, (status, action) => ({ ...status, currentOperation: { ...action.payload } }));
  },
});

export const { clearCurrentOperation } = operationsSlice.actions;

export const operations = operationsSlice.reducer;

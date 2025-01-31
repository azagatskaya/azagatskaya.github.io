import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from 'src/shared/config';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (builder) => ({
    signIn: builder.query({
      query: (body) => ({ url: '/signin', method: 'POST', body }),
    }),
    signUp: builder.query({
      query: (body) => ({ url: '/signup', method: 'POST', body }),
    }),
  }),
});

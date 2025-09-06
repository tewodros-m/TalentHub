import { apiSlice } from '../api/apiSlice';
import type { UsersResponse } from '../../types/userTypes';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersResponse, void>({
      query: () => '/users',
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;

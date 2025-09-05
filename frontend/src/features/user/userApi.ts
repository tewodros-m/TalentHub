import { apiSlice } from '../api/apiSlice';
import type { UsersResponse } from '../../types/userTypes';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersResponse, void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ _id }) => ({
                type: 'Users' as const,
                id: _id,
              })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;

import { apiSlice } from '../api/apiSlice';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'applicant' | 'employer';
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string; role: string };
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

import type { Job } from '../../types/jobTypes';
import { apiSlice } from '../api/apiSlice';

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], { search?: string }>({
      query: ({ search }) => `/jobs?search=${search || ''}`,
    }),
  }),
});

export const { useGetJobsQuery } = jobApi;

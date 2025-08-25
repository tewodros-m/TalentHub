import type { Job, JobResponse } from '../../types/jobTypes';
import { apiSlice } from '../api/apiSlice';

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobResponse, { search?: string }>({
      query: ({ search }) => `/jobs?search=${search || ''}`,
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (data) => ({
        url: '/jobs',
        method: 'POST',
        body: data,
      }),
    }),
    getEmployerJobs: builder.query<JobResponse, void>({
      query: () => '/jobs/employer',
    }),
    updateJob: builder.mutation<Job, { id: string; data: Partial<Job> }>({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteJob: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useCreateJobMutation,
  useGetEmployerJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;

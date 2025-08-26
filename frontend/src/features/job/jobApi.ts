import type { Job, JobResponse } from '../../types/jobTypes';
import { apiSlice } from '../api/apiSlice';

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<JobResponse, { search?: string }>({
      query: ({ search }) => `/jobs?search=${search || ''}`,
      providesTags: ['Jobs'],
    }),
    getJobById: builder.query<Job, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: ['Jobs'],
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (data) => ({
        url: '/jobs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EmployerJobs', 'Jobs'],
    }),
    getEmployerJobs: builder.query<JobResponse, void>({
      query: () => '/jobs/employer',
      providesTags: ['EmployerJobs'],
    }),
    updateJob: builder.mutation<Job, { id: string; data: Partial<Job> }>({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['EmployerJobs', 'Jobs'],
    }),
    deleteJob: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EmployerJobs', 'Jobs'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useGetEmployerJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;

import type { Job, JobResponse } from '../../types/jobTypes';
import { apiSlice } from '../api/apiSlice';

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<JobResponse, { search?: string }>({
      query: ({ search }) => `/jobs?search=${search || ''}`,
      providesTags: ['Jobs'],
    }),
    getAllJobsByAdmin: builder.query<JobResponse, { search?: string }>({
      query: ({ search }) => `/jobs/admin?search=${search || ''}`,
      providesTags: ['Jobs'],
    }),
    getJobById: builder.query<Job, string>({
      query: (jobId) => `/jobs/${jobId}`,
      providesTags: ['Jobs'],
    }),

    createJob: builder.mutation<
      Job,
      { data: Partial<Job>; employerId: string }
    >({
      query: ({ data }) => ({
        url: '/jobs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { employerId }) => [
        { type: 'EmployerJobs', id: employerId },
        { type: 'Jobs' },
      ],
    }),
    getEmployerJobs: builder.query<JobResponse, string>({
      query: (employerId) => `/jobs/employer/${employerId}`,
      providesTags: (_result, _error, arg) => [
        { type: 'EmployerJobs', id: arg },
      ],
    }),
    updateJob: builder.mutation<
      Job,
      { jobId: string; data: Partial<Job>; employerId: string }
    >({
      query: ({ jobId, data }) => ({
        url: `/jobs/${jobId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { employerId }) => [
        { type: 'EmployerJobs', id: employerId },
        { type: 'Jobs' },
      ],
    }),
    deleteJob: builder.mutation<
      { message: string },
      { jobId: string; employerId: string }
    >({
      query: ({ jobId }) => ({
        url: `/jobs/${jobId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { employerId }) => [
        { type: 'EmployerJobs', id: employerId },
        { type: 'Jobs' },
      ],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetAllJobsByAdminQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useGetEmployerJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobApi;

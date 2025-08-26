import type {
  ApplicationWithObjects,
  GetApplicationsResponse,
} from '../../types/applicationTypes';
import type { User } from '../../types/authTypes';
import { apiSlice } from '../api/apiSlice';

export interface AdminJob {
  _id: string;
  title: string;
  description: string;
  createdBy: User;
  applicationsCount: number;
}

export type AdminJobsResponse = {
  results: number;
  jobs: AdminJob[];
};

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<AdminJobsResponse, void>({
      query: () => '/admin/jobs',
      providesTags: ['Jobs'],
    }),
    getAllApplications: builder.query<GetApplicationsResponse, void>({
      query: () => '/admin/applications',
      providesTags: ['Applications'],
    }),
    updateApplicationStatus: builder.mutation<
      ApplicationWithObjects,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/admin/applications/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Applications'],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = adminApi;

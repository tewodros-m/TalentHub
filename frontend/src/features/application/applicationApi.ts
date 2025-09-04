import { apiSlice } from '../api/apiSlice';
import type {
  Application,
  GetApplicationsResponse,
} from '../../types/applicationTypes';

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // POST /applications
    applyToJob: builder.mutation<
      Application,
      { formData: FormData; userId: string; employerId: string }
    >({
      query: ({ formData }) => ({
        url: '/applications',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (_result, _error, { userId, employerId }) => [
        { type: 'Applications', id: userId },
        { type: 'EmployerApplications', id: employerId },
      ],
    }),

    // GET /applications/:userId
    getUserApplications: builder.query<
      GetApplicationsResponse,
      { userId: string }
    >({
      query: ({ userId }) => `/applications/${userId}`,
      providesTags: (_result, _error, { userId }) => [
        { type: 'Applications', id: userId },
      ],
    }),

    getEmployerApplications: builder.query<
      GetApplicationsResponse,
      { employerId: string }
    >({
      query: ({ employerId }) => `applications/employer/${employerId}`,
      providesTags: (_result, _error, { employerId }) => [
        { type: 'EmployerApplications', id: employerId },
      ],
    }),

    // PATCH /applications/:id/status
    updateApplicationStatusByEmployer: builder.mutation<
      Application,
      { applicationId: string; status: string; employerId: string }
    >({
      query: ({ applicationId, status }) => ({
        url: `/applications/${applicationId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { employerId }) => [
        { type: 'EmployerApplications', id: employerId },
      ],
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useGetUserApplicationsQuery,
  useGetEmployerApplicationsQuery,
  useUpdateApplicationStatusByEmployerMutation,
} = applicationApi;

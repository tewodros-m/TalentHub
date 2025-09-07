import { apiSlice } from '../api/apiSlice';
import type {
  Application,
  GetApplicationsResponse,
} from '../../types/applicationTypes';

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /applications
    getAllApplications: builder.query<GetApplicationsResponse, void>({
      query: () => '/applications',
      providesTags: [{ type: 'Applications', id: 'LIST' }],
    }),
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
        { type: 'Applications', id: 'LIST' },
      ],
    }),

    // GET /applications/:userId
    getUserApplications: builder.query<
      GetApplicationsResponse,
      { userId: string; status?: string }
    >({
      query: ({ userId, status }) => {
        let url = `/applications/${userId}`;
        if (status) url += `?status=${status}`;
        return url;
      },
      providesTags: (_result, _error, { userId }) => [
        { type: 'Applications', id: userId },
      ],
    }),
    // GET /applications/employer/:employerId
    getEmployerApplications: builder.query<
      GetApplicationsResponse,
      { employerId: string }
    >({
      query: ({ employerId }) => `applications/employer/${employerId}`,
      providesTags: (_result, _error, { employerId }) => [
        { type: 'EmployerApplications', id: employerId },
      ],
    }),

    // PATCH /applications/:id
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
        { type: 'Applications', id: _result?.userId },
        { type: 'Applications', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useApplyToJobMutation,
  useGetUserApplicationsQuery,
  useGetEmployerApplicationsQuery,
  useUpdateApplicationStatusByEmployerMutation,
} = applicationApi;

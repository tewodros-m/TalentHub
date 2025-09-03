import { apiSlice } from '../api/apiSlice';
import type {
  Application,
  GetApplicationsResponse,
} from '../../types/applicationTypes';

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /applications
    getApplications: builder.query<GetApplicationsResponse, void>({
      query: () => '/applications',
      providesTags: ['Applications'],
    }),

    // POST /applications
    applyToJob: builder.mutation<
      Application,
      { formData: FormData; userId: string }
    >({
      query: ({ formData }) => ({
        url: '/applications',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'Applications', id: userId },
        { type: 'Applications' },
      ],
    }),

    // GET /applications/:userId
    getMyApplications: builder.query<GetApplicationsResponse, string>({
      query: (userId) => `/applications/${userId}`,
      providesTags: (_result, _error, arg) => [
        { type: 'Applications', id: arg },
      ],
    }),

    getEmployerApplications: builder.query<GetApplicationsResponse, void>({
      query: () => 'applications/employer',
      providesTags: ['Applications'],
    }),

    // PATCH /applications/:id/status
    updateApplicationStatusByEmployer: builder.mutation<
      Application,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/applications/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, _arg) => [
        { type: 'Applications', id: _arg.id },
        { type: 'Applications' },
      ],
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useGetMyApplicationsQuery,
  useGetApplicationsQuery,
  useGetEmployerApplicationsQuery,
  useUpdateApplicationStatusByEmployerMutation,
} = applicationApi;

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
    applyToJob: builder.mutation<Application, FormData>({
      query: (formData) => ({
        url: '/applications',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Applications', 'Jobs'],
    }),

    // GET /applications/:userId
    getMyApplications: builder.query<GetApplicationsResponse, string>({
      query: (userId) => `/applications/${userId}`,
      providesTags: ['Application'],
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useGetMyApplicationsQuery,
  useGetApplicationsQuery,
} = applicationApi;

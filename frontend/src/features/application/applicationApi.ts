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
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Applications', id: userId },
        { type: 'Applications' },
      ],
    }),

    // GET /applications/:userId
    getMyApplications: builder.query<GetApplicationsResponse, string>({
      query: (userId) => `/applications/${userId}`,
      providesTags: (result, error, arg) => [{ type: 'Applications', id: arg }],
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useGetMyApplicationsQuery,
  useGetApplicationsQuery,
} = applicationApi;

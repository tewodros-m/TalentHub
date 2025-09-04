import type { NotificationsResponse } from '../../types/notificationTypes';
import { apiSlice } from '../api/apiSlice';

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployerNotifications: builder.query<NotificationsResponse, string>({
      query: (employerId) => `/notifications/employer/${employerId}`,
      providesTags: ['Notifications'],
    }),
    markNotificationRead: builder.mutation<{ status: string }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetEmployerNotificationsQuery,
  useMarkNotificationReadMutation,
} = notificationApi;

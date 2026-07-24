import { baseApi } from "./baseApi";

export interface DbNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<{ success: boolean; data: DbNotification[] }, void>({
      query: () => "/notifications",
      providesTags: ["Notifications"],
    }),
    markAllAsRead: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/notifications/mark-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markSingleAsRead: builder.mutation<{ success: boolean; message: string; data: DbNotification }, { id: string }>({
      query: ({ id }) => ({
        url: `/notifications/${id}/mark-read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    clearAllNotifications: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/notifications/clear-all",
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteNotification: builder.mutation<{ success: boolean; message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkSingleAsReadMutation,
  useClearAllNotificationsMutation,
  useDeleteNotificationMutation,
} = notificationApi;

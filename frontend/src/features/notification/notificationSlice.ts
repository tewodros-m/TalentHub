import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  jobTitle: string;
  applicantName: string;
  applicantId: string;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNewApplicationNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const { setNewApplicationNotification, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;

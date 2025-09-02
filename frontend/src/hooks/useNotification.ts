import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

export const useNotification = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const unread = notifications.filter((n) => !n.read).length;
  return {
    notifications,
    notificationCount: notifications.length,
    unreadCount: unread,
  };
};

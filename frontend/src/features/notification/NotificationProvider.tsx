import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetNotificationsQuery } from './notificationApi';
import { setNotifications } from './notificationSlice';
import useSocket from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const isEmployer = user?.role === 'employer';

  // Only fetch notifications if user is employer
  const { data: data = { results: 0, notifications: [] } } =
    useGetNotificationsQuery(undefined, {
      skip: !isEmployer,
    });

  // Only connect socket if employer
  useSocket(isEmployer ? user?.id : undefined);

  const dbNotifications = data.notifications;

  // Load DB notifications on mount
  useEffect(() => {
    if (isEmployer && dbNotifications?.length) {
      dispatch(setNotifications(dbNotifications));
    }
  }, [isEmployer, dbNotifications, dispatch]);

  return <>{children}</>;
};

export default NotificationProvider;

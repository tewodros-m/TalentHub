import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetEmployerNotificationsQuery } from './notificationApi';
import { setNotifications } from './notificationSlice';
import useSocket from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const isEmployer = user?.id && user?.role === 'employer';

  // Only fetch notifications if user is employer
  const { data: data = { results: 0, notifications: [] } } =
    useGetEmployerNotificationsQuery(user?.id ?? '', {
      skip: !isEmployer,
      refetchOnMountOrArgChange: true,
    });

  // Update store when new data comes in
  useEffect(() => {
    if (isEmployer && data?.notifications) {
      dispatch(setNotifications(data.notifications));
    }
  }, [isEmployer, data?.notifications, dispatch]);

  // Only connect socket if employer
  useSocket(isEmployer ? user?.id : undefined);

  return <>{children}</>;
};

export default NotificationProvider;

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  addNotification,
  setNotifications,
} from '../features/notification/notificationSlice';
import { useAuth } from '../hooks/useAuth';
import {
  useGetEmployerApplicationsQuery,
  useGetAllApplicationsQuery,
  useGetUserApplicationsQuery,
} from '../features/application/applicationApi';
import { useGetEmployerNotificationsQuery } from '../features/notification/notificationApi';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const RealtimeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  const role = user?.role;
  const userId = user?.id;

  // Employer queries
  const { refetch: refetchEmployerApps } = useGetEmployerApplicationsQuery(
    { employerId: userId ?? '' },
    { skip: role !== 'employer' }
  );
  const { data: employerNotifs } = useGetEmployerNotificationsQuery(
    userId ?? '',
    {
      skip: role !== 'employer',
      refetchOnMountOrArgChange: true,
    }
  );

  // Admin queries
  const { refetch: refetchAdminApps } = useGetAllApplicationsQuery(undefined, {
    skip: role !== 'admin',
  });

  // Applicant queries
  const { refetch: refetchApplicantApps } = useGetUserApplicationsQuery(
    { userId: userId ?? '' },
    { skip: role !== 'applicant' }
  );

  // Sync employer notifications from API
  useEffect(() => {
    if (role === 'employer' && employerNotifs?.notifications) {
      dispatch(setNotifications(employerNotifs.notifications));
    }
  }, [role, employerNotifs, dispatch]);

  // Setup socket
  useEffect(() => {
    if (!userId || !role) return;

    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        withCredentials: true,
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        console.log('⚡ Socket connected:', socketRef.current?.id);

        if (role === 'employer') {
          socketRef.current?.emit('joinEmployerRoom', userId);
        }
        if (role === 'applicant') {
          socketRef.current?.emit('joinApplicantRoom', userId);
        }
      });

      // New Application for employer
      socketRef.current.on('employer:newApplication', (data) => {
        if (role === 'employer') {
          dispatch(addNotification(data));
          refetchEmployerApps();
        }
      });

      // New Application for admin
      socketRef.current.on('admin:newApplication', () => {
        if (role === 'admin') {
          refetchAdminApps();
        }
      });

      socketRef.current.on('applicant:statusUpdated', () => {
        if (role === 'applicant') {
          refetchApplicantApps();
        }
      });

      socketRef.current.on('admin:statusUpdated', () => {
        if (role === 'admin') {
          refetchAdminApps();
        }
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [
    userId,
    role,
    dispatch,
    refetchEmployerApps,
    refetchAdminApps,
    refetchApplicantApps,
  ]);

  return <>{children}</>;
};

export default RealtimeProvider;

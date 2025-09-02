import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addNotification } from '../features/notification/notificationSlice';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const useSocket = (employerId: string | undefined) => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!employerId) {
      console.warn('No employerId provided, skipping socket connection.');
      return;
    }

    // Prevent duplicate socket connections
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        withCredentials: true,
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected:', socketRef.current?.id);
        console.log('Joining employer room:', employerId);
        socketRef.current?.emit('joinEmployerRoom', employerId);
      });

      socketRef.current.on('newApplication', (data) => {
        console.log('Received newApplication:', data);
        dispatch(addNotification(data));
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });
    }

    // Cleanup on unmount
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [employerId, dispatch]);

  return socketRef.current;
};

export default useSocket;

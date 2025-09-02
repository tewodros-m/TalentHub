import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setNewApplicationNotification } from '../features/notification/notificationSlice';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const useSocket = (employerId: string | undefined) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!employerId) {
      console.warn('⚠️ No employerId provided, skipping socket connection.');
      return;
    }

    // Create socket instance
    const socket: Socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    // When connected
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);

      // Now safe to join employer room
      console.log('➡️ Joining employer room:', employerId);
      socket.emit('joinEmployerRoom', employerId);
    });

    // Server confirms new applications
    socket.on('newApplication', (data) => {
      console.log('Received newApplication:', data);
      dispatch(setNewApplicationNotification(data));
    });

    // When disconnected
    socket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [employerId, dispatch]);
};

export default useSocket;

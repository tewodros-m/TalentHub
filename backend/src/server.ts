import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import applicationRoutes from './routes/applicationRoutes';
import {
  notFoundHandler,
  globalErrorHandler,
} from './middlewares/errorHandler';

(async () => {
  await connectDB();

  const app = createApp();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  app.use((req, _res, next) => {
    req.io = io;
    next();
  });

  //routes that require req.io
  app.use('/applications', applicationRoutes);

  // Error handling middlewares
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  // ✅ Handle connections
  io.on('connection', (socket) => {
    // console.log('User connected:', socket.id);

    // Employers join their personal room
    socket.on('joinEmployerRoom', (employerId: string) => {
      socket.join(employerId);
      console.log(`Employer ${employerId} joined room`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  server.listen(env.PORT, () => {
    console.log(`🚀 TalentHub API running on port ${env.PORT}`);
  });
})();

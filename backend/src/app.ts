import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import notificationRoutes from './routes/notificationRoutes';
import userRoutes from './routes/userRoutes';

export const createApp = () => {
  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // Test endpoint
  app.get('/', (_req, res) =>
    res.status(200).json({ status: 'ok', name: 'TalentHub API' })
  );

  app.use('/auth', authRoutes);
  app.use('/jobs', jobRoutes);
  app.use('/notifications', notificationRoutes);
  app.use('/users', userRoutes);

  return app;
};

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import notificationRoutes from './routes/notificationRoutes';
import userRoutes from './routes/userRoutes';
import { allowedOrigins } from './config/cors';

export const createApp = () => {
  const app = express();

  // Middlewares
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow mobile apps / curl

        if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
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

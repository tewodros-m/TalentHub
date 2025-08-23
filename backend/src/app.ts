import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import applicationRoutes from './routes/applicationRoutes';

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
  app.get('/', (req: Request, res: Response) =>
    res.status(200).json({ status: 'ok', name: 'TalentHub API' })
  );

  app.use('/auth', authRoutes);
  app.use('/jobs', jobRoutes);
  app.use('/applications', applicationRoutes);

  // Error handling middlewares
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
};

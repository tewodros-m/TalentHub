import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost:27017/talenthub',
  JWT_SECRET: process.env.JWT_SECRET ?? 'your_jwt_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
};

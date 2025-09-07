import { env } from './env';

export const allowedOrigins =
  env.CORS_ORIGIN === '*'
    ? ['*']
    : env.CORS_ORIGIN.split(',').map((o) => o.trim());

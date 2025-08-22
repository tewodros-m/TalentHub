import { Request, Response, NextFunction } from 'express';

// 404 handler
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
  next();
};

// General error handler
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message });
  next();
};

export { notFoundHandler, globalErrorHandler };

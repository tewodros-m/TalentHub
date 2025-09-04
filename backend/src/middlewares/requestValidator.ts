import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const requestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationEerrors = validationResult(req);

  if (!validationEerrors.isEmpty()) {
    const errors = validationEerrors.array().map((error) => {
      const errorObject: { [key: string]: string } = {};
      //@ts-ignore
      errorObject[error.path] = error.msg;
      return errorObject;
    });

    return res.status(400).json({ errors });
  }
  next();
};

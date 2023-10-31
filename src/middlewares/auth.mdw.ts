import { NextFunction, Request, Response } from 'express';

export const authenticate = (_req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = true;
  if (isAuthenticated) {
    next();
    return;
  }
  res.status(401).json({
    message: 'Unauthorized!'
  });
};

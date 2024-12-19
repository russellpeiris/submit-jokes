import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).send('Token required');
    return;
  }

  jwt.verify(token, 'SECRET', (err) => {
    if (err) {
      res.status(403).send('Invalid token');
      return;
    }

    next();
  });
};

import { NextFunction, Request, Response } from 'express';
import { InvalidParamError, MissingParamError, NotFoundError } from '../errors';

export const validateResponseError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (
      error.name === InvalidParamError.name ||
      error.name === MissingParamError.name
  ) {
      return res.status(400).json({
          name: error.name,
          message: error.message,
      });
  }
  
  if (error.name === NotFoundError.name) {
      return res.status(404).json({
          name: error.name,
          message: error.message,
      });
  }

  return res.status(500).json({ 
    name: 'Internal Server Error',
    message: 'Sorry for the inconvenient',
  });
}

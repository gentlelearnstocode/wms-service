import { Request, Response, NextFunction } from 'express';

import { AppError } from '../../utils/app-error';
import Message from '../../constants/Message';
import ERROR from '../../constants/Error';
import STATUS from '../../constants/Status';

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: STATUS.ERROR,
      message: Message.INTERNAL_SERVER_ERROR,
    });
  }
};

const castErrorHandler = (err: any, res: Response) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const duplicateErrorHandler = (err: any, res: Response) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const ValidationErrorHandler = (err: any, res: Response) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

export const ErrorController = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === ERROR.CAST_ERROR) error = castErrorHandler(error, res);
    if (error.code === 11000) error = duplicateErrorHandler(error, res);
    if (error.name === ERROR.VALIDATION_ERROR) error = ValidationErrorHandler(error, res);
    sendErrorProd(error, res);
  }
};

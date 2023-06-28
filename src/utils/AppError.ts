import STATUS from '../constants/Status';
import { Middleware } from 'routing-controllers';

// @Middleware({ type: 'after' })
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? STATUS.FAIL : STATUS.SUCCESS;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

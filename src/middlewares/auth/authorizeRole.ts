import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils';

const authorizeRole = (
  req: Request,
  res: Response,
  next: NextFunction,
  userRole: Array<string>
) => {
  if (userRole.includes(req.body.user.role)) {
    next();
  } else {
    return next(
      new AppError('You are not authorized to perform this action', 403)
    );
  }
};

export default authorizeRole;

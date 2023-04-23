import { Request, Response, NextFunction } from 'express';

import { AppError } from '../../utils';
import Message from '../../constants/Message';

const authorizeRole = (req: Request, res: Response, next: NextFunction, userRole: Array<string>) => {
  if (userRole.includes(req.body.user.role)) {
    next();
  } else {
    return next(new AppError(Message.UNAUTHORIZED_REQUEST, 403));
  }
};

export default authorizeRole;

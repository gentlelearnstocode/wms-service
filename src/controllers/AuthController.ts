import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';

import { AppError } from '../utils';
import Message from '../constants/Message';
import STATUS from '../constants/Status';
import { jwtGenerator } from '../utils';

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(Message.PROVIDE_EMAIL_AND_PASSWORD, 400));
  }
  try {
    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(Message.INVALID_EMAIL_OR_PASSWORD, 401));
    } else {
      const token = jwtGenerator(user._id);
      res.status(200).json({
        status: STATUS.SUCCESS,
        token,
        user,
      });
    }
  } catch (error) {
    return next(error);
  }
};

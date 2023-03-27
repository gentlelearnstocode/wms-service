import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models';
import STATUS from '../constants/Status';
import { AppError, jwtGenerator } from '../utils';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email)
    return next(new AppError('Please provide an email', 400));
  if (!req.body.password)
    return next(new AppError('Please provide a password', 400));
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = jwtGenerator(user._id);
    res.status(201).json({
      status: STATUS.SUCCESS,
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  try {
    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    } else {
      const token = jwtGenerator(user._id);
      res.status(201).json({
        status: STATUS.SUCCESS,
        token,
        data: user,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      result: users.length,
      users,
    },
  });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      user,
    },
  });
};

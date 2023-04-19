import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User, Warehouse } from '../models';
import STATUS from '../constants/Status';
import { AppError, jwtGenerator } from '../utils';
import Message from '../constants/Message';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.email) return next(new AppError(Message.PROVIDE_EMAIL, 400));
  if (!req.body.password)
    return next(new AppError(Message.PROVIDE_PASSWORD, 400));
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
      warehouse: req.body.warehouse._id,
    });
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
  const user = await User.findById(req.params.id).populate('warehouse');
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      user,
    },
  });
};

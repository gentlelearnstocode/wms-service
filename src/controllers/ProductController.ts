import { Product } from '../models';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/AppError';
import STATUS from '../constants/Status';

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: STATUS.SUCCESS,
    data: {
      product,
    },
  });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      result: products.length,
      products,
    },
  });
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new AppError(`No road found with this ID: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      product,
    },
  });
};

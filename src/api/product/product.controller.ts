import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../utils';
import STATUS from '../../constants/Status';
import { productService } from './product.service';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json({
      status: STATUS.SUCCESS,
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.findAll(req.query);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        result: products.length,
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await productService.findById(req.params.id);
  if (!product) {
    return next(new AppError(`No product found with this ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      product,
    },
  });
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json({
      status: STATUS.SUCCESS,
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productService.delete(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
    });
  } catch (e) {
    next(e);
  }
};

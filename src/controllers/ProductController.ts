import Product from '../models/Product';
import { Request, Response } from 'express';

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

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      status: STATUS.FAIL,
      message: 'Product not found',
    });
  }
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      product,
    },
  });
};

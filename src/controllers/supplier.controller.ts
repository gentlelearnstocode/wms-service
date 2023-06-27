import { NextFunction, Request, Response } from 'express';

import { SupplierModel } from '../models';
import STATUS from '../constants/Status';

export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await SupplierModel.create(req.body);
    res.status(201).json({
      status: STATUS.SUCCESS,
      data: {
        supplier,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSuppliers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const suppliers = await SupplierModel.find();
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        result: suppliers.length,
        suppliers,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        supplier,
      },
    });
  } catch (error) {
    next(error);
  }
};

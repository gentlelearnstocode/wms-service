import { NextFunction, Request, Response } from 'express';

import { supplierService } from '../services';
import STATUS from '../constants/Status';

export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await supplierService.create(req.body);
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
    const suppliers = await supplierService.findAll()
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
    const supplier = await supplierService.findById(req.params.id);
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

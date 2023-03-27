import { NextFunction, Request, Response } from 'express';

import { Warehouse } from '../models';
import STATUS from '../constants/Status';
import { catchAsync } from '../utils/catchAsync';

export const createWarehouse = async (req: Request, res: Response) => {
  const warehouse = await Warehouse.create(req.body);
  res.status(201).json({
    status: STATUS.SUCCESS,
    data: {
      warehouse,
    },
  });
};

export const getAllWarehouses = async (req: Request, res: Response) => {
  const warehouses = await Warehouse.find();
  res.status(200).json({
    status: STATUS.SUCCESS,
    data: {
      result: warehouses.length,
      warehouses,
    },
  });
};

export const getWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        warehouse,
      },
    });
  } catch (error) {
    return next(error);
  }
};

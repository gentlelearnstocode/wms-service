import { NextFunction, Request, Response } from 'express';

import STATUS from '../constants/Status';
import { warehouseService } from '../services';

export const createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await warehouseService.create(req.body)
    res.status(201).json({
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllWarehouses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const warehouses = await warehouseService.findAll(req.query);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        result: warehouses.length,
        warehouses,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getWarehouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const warehouse = await warehouseService.findById(req.params.id)
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: warehouse
    })
  } catch (error) {
    next(error);
  }
};


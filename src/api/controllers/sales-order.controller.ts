import { NextFunction, Request, Response } from 'express';

import { salesOrderService } from '../services';
import STATUS from '../../constants/Status';

export const createSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salesOrder = await salesOrderService.create(req.body);
    res.status(201).json({
      status: STATUS.SUCCESS,
      data: {
        salesOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSalesOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salesOrders = await salesOrderService.findAll();
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        result: salesOrders.length,
        salesOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salesOrder = await salesOrderService.findById(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        salesOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await salesOrderService.delete(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

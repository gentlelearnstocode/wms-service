import { NextFunction, Request, Response } from 'express';
import STATUS from '../../constants/Status';
import { salesOrderService } from './sales-order.service';
import { getPaginationFromQuery } from '../../utils/get-pagination';

export const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salesOrder = await salesOrderService.upsert(req.body);
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
    const salesOrders = await salesOrderService.findAll(getPaginationFromQuery(req.query));
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

export const issueSalesOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issued = await salesOrderService.issueSalesOrder(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: issued,
    });
  } catch (e) {
    next(e);
  }
};

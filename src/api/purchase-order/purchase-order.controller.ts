import { NextFunction, Request, Response } from 'express';
import { purchaseOrderService } from './purchase-order.service';
import STATUS from '../../constants/Status';

export const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const purchaseOrder = await purchaseOrderService.upsert(req.body);
    res.status(201).json({
      status: STATUS.SUCCESS,
      data: {
        purchaseOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPurchaseOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const purchaseOrders = await purchaseOrderService.findAll();
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        result: purchaseOrders.length,
        purchaseOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const purchaseOrder = await purchaseOrderService.findById(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        purchaseOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deletePurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await purchaseOrderService.delete(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

export const receivePurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const received = await purchaseOrderService.receivePurchaseOrder(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: received,
    });
  } catch (e) {
    next(e);
  }
};

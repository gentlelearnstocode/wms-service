import { NextFunction, Request, Response } from 'express';
import { inventoryService } from './inventory.service';
import STATUS from '../../constants/Status';

export const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventory = await inventoryService.upsert(req.body);
    res.status(201).json({
      status: STATUS.SUCCESS,
      data: {
        inventory,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInventories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventories = await inventoryService.findAll();
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        result: inventories.length,
        inventories,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventory = await inventoryService.findById(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: {
        inventory,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await inventoryService.delete(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};
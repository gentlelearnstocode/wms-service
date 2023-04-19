import { Request, Response } from 'express';

import Inventory from '../models/Inventory';

export const createInventory = async (req: Request, res: Response) => {
  const inventory = await Inventory.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      inventory,
    },
  });
};

export const getAllInventories = async (req: Request, res: Response) => {
  const inventories = await Inventory.find();
  res.status(200).json({
    status: 'success',
    data: {
      result: inventories.length,
      inventories,
    },
  });
};

export const getInventory = async (req: Request, res: Response) => {
  const inventory = await Inventory.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      inventory,
    },
  });
};

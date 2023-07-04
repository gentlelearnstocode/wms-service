import { NextFunction, Request, Response } from 'express';

import STATUS from '../../constants/Status';
import { warehouseService } from './warehouse.service';
import { logger } from '../../utils';

export const upsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const warehouse = await warehouseService.upsert(req.body);
    res.status(201).json({
      status: STATUS.SUCCESS,
      data: warehouse,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllWarehouses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const warehouses = await warehouseService.findAll(req.query);
    logger.info(`body: ${JSON.stringify(req.body)} | query: ${JSON.stringify(req.query)}`);
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
    const warehouse = await warehouseService.findById(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
      data: warehouse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWarehouse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await warehouseService.delete(req.params.id);
    res.status(200).json({
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

// @Controller('/warehouses')
// export class WarehouseController {
//   // constructor(private readonly warehouseService: WarehouseService) {}

//   @Get('/')
//   async getWarehouseById(@Req() req: Request, @Res() res: Response) {
//     res.status(200).json({
//       status: STATUS.SUCCESS,
//     });
//   }
// }

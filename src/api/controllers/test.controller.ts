import { Request, Response } from 'express';

export class TestController {
  public static getTest(req: Request, res: Response) {
    res.status(200).json({
      status: 'success',
    });
  }
}

export default TestController;

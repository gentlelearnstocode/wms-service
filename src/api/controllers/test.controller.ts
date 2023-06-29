import { Controller, Get, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';

@Controller('/test')
export class TestController {
  @Get('/')
  public getTest(@Req() req: Request, @Res() res: Response) {
    res.send('success');
  }
}

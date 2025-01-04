import {
  Controller,
  Get,
  HttpStatus,
  UseFilters,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { ViewAuthFilter } from './exceptions/unauthorized.exception';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get()
  async redirectToURLShortener(@Req() req: Request, @Res() res: Response) {
    if (!req['user']?.isAuthorized)
      return res.status(HttpStatus.UNAUTHORIZED).render('index');
    return res.status(HttpStatus.OK).redirect('/url-shortener');
  }

  @Get('health')
  async healthCheck(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('OK');
  }
}

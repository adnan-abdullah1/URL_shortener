import {
  Controller,
  Get,
  HttpStatus,
  UseFilters,
  UseGuards,
  Res,
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
  async healthCheck(@Res() res: Response) {
    return res.status(HttpStatus.OK).render('index');
  }
}

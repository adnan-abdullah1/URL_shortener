import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { ViewAuthFilter } from './exceptions/unauthorized.exception';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}

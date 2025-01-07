import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ViewAuthFilter } from 'src/exceptions/unauthorized.exception';

@UseGuards(AuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * Renders Analytics view
   * @param res
   * @returns
   */
  @Get()
  renderAnalytics(@Res() res: Response) {
    return res.render('analytics');
  }

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get('user-analytics')
  async getUserURLAnalytics(@Req() req, @Res() res) {
    const { userId } = req['user'];
    const analytics = await this.analyticsService.getUserAnalytics(userId);
    return res.json(analytics);
  }

}

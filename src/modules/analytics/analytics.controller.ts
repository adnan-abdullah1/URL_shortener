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
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ViewAuthFilter } from 'src/exceptions/unauthorized.exception';

@UseGuards(AuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  create(@Body() createAnalyticsDto: CreateAnalyticsDto) {
    // return this.analyticsService.create(createAnalyticsDto);
  }

  /**
   * Renders Analytics view
   * @param res
   * @returns
   */
  @Get()
  renderAnalytics(@Res() res: Response) {
    return res.render('analytics');
  }

  @Get('user-analytics')
  async getUserURLAnalytics(@Req() req, @Res() res) {
    const { userId } = req['user'];

    const analytics = await this.analyticsService.getUserAnalytics(userId);
    return res.json(analytics);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyticsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticsDto,
  ) {
    // return this.analyticsService.update(+id, updateAnalyticsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyticsService.remove(+id);
  }
}

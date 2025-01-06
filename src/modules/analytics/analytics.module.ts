import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortenerModule } from '../url-shortener/url-shortener/url-shortener.module';

@Module({
  imports: [TypeOrmModule.forFeature([URL]), UrlShortenerModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}

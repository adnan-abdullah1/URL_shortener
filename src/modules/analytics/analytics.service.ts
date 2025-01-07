import { Injectable } from '@nestjs/common';
import { URL } from 'src/models/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlShortenerService } from '../url-shortener/url-shortener/url-shortener.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly urlService: UrlShortenerService,
  ) {}


  getUserAnalytics(userId: string) {
    return this.urlService.getClickCount(userId);
  }

 
}

import { Injectable } from '@nestjs/common';
import { URL } from 'src/models/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlShortenerService } from '../url-shortener/url-shortener/url-shortener.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(URL)
    private urlRepository: Repository<URL>,
    private readonly urlService: UrlShortenerService,
  ) {}
  // create(createAnalyticsDto: CreateAnalyticsDto) {
  //   return 'This action adds a new analytics';
  // }

  getUserAnalytics(userId: string) {
    return this.urlService.getClickCount(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  // update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
  //   return `This action updates a #${id} analytics`;
  // }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}

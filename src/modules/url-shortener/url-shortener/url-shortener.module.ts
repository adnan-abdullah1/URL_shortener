import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';
import { URL } from 'src/models/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashCounter } from 'src/models/hash-counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([URL, HashCounter])],
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService],
})
export class UrlShortenerModule {}

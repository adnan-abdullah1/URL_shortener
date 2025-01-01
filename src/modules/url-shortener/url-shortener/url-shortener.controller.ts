import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UrlShortenerService } from './url-shortener.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  // add middleware todo
  @ApiBody({ schema: { example: { url: 'https://www.google.com' } } }) // this is for swagger
  async shortenUrl(@Req() req, @Res() res) {
    const { url } = req.body;

    // check if url is already in db, then send old existing hash
    const existingUrl = await this.urlShortenerService.getURLbyURL(url);
    if (existingUrl) return res.status(301).json({ hash: existingUrl.hash });

    const hash = await this.urlShortenerService.convertToBase62();
    const id = uuidv4();
    await this.urlShortenerService.saveUrl({ id, url, hash });
    return res.json({ hash });
  }

  @Get(':hash')
  @Version('')
  @ApiParam({ name: 'hash', example: 'abc' }) // this is for swagger
  async getUrl(@Req() req, @Res() res) {
    const { hash } = req.params;

    const url = await this.urlShortenerService.getURL(hash);
    // sending status 301, so browser will cache it
    return res.status(HttpStatus.MOVED_PERMANENTLY).json(url);
  }
}

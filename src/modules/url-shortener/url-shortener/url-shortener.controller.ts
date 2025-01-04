import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  Version,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UrlShortenerService } from './url-shortener.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ViewAuthFilter } from 'src/exceptions/unauthorized.exception';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get('')
  async home(@Res() res) {
    return res.render('url-shortener');
  }

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Post('shorten')
  // add middleware todo
  @ApiBody({ schema: { example: { url: 'https://www.google.com' } } }) // this is for swagger
  async shortenUrl(@Req() req, @Res() res) {
    const { url } = req.body;
    const prefix = `${req.protocol}://${req.hostname}:${process.env.PORT}/url-shortener/`;

    // check if url is already in db, then send old existing hash
    const existingUrl = await this.urlShortenerService.getURLbyURL(url);
    if (existingUrl)
      return res.render('url-shortener', {
        shortURL: `${prefix}${existingUrl.hash}`,
      });

    const hash = await this.urlShortenerService.convertToBase62();
    const id = uuidv4();
    await this.urlShortenerService.saveUrl({ id, url, hash });

    return res.status(HttpStatus.MOVED_PERMANENTLY).render('url-shortener', {
      shortURL: `${prefix}${hash}`,
    });
  }

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get(':hash')
  @Version('')
  @ApiParam({ name: 'hash', example: 'abc' }) // this is for swagger
  async getUrl(@Req() req, @Res() res) {
    const { hash } = req.params;
    const url = await this.urlShortenerService.getURL(hash);

    return res.redirect(url);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UrlShortenerService } from './url-shortener.service';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ViewAuthFilter } from 'src/exceptions/unauthorized.exception';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { UrlDto } from '../dto/url.dto';
import { ShortUrlDto } from '../dto/short-url.dto';

@Controller('url-shortener')
export class UrlShortenerController {
  constructor(
    private readonly urlShortenerService: UrlShortenerService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Get('')
  async home(@Res() res) {
    return res.render('url-shortener');
  }

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Post('shorten')
  async shortenUrl(@Req() req, @Res() res, @Body() body: UrlDto) {
    try {
      const { url } = body;
      const { email } = req['user'];
      const prefix = `${process.env.DOMAIN}/url-shortener/`;
      const user = await this.userService.findUser(email);

      if (!user || !user.id) {
        // handle error if the user is not found
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'User not found' });
      }

      // Check if URL already exists in the database
      const existingUrl = await this.urlShortenerService.getURLbyURL(url);
      if (existingUrl) {
        return res.status(HttpStatus.OK).json({
          shortURL: `${prefix}${existingUrl.hash}`,
        });
      }

      const hash = await this.urlShortenerService.convertToBase62();
      const id = uuidv4();

      await this.urlShortenerService.saveUrl({
        id,
        url,
        hash,
        user: user,
      });

      return res.status(HttpStatus.OK).json({
        shortURL: `${prefix}${hash}`,
      });
    } catch (error) {
      console.error('Error shortening URL:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @UseFilters(ViewAuthFilter)
  @Post('/original-url')
  async getUrl(@Req() req, @Res() res, @Body() body: ShortUrlDto) {
    try {
      const { shortURL } = body;
      if (!shortURL) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'URL is required' });
      }

      // Extract  hash from the shortened URL
      const hash = new URL(shortURL).pathname.split('/').filter(Boolean).pop();

      const url = await this.urlShortenerService.getURL(hash);

      if (!url) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'URL not found for the provided hash' });
      }

      // Update the click count
      // TODO: could be saved in Redis periodic update instead calling db per call
      await this.urlShortenerService.updateClickCount(url);

      return res.json({ originalURL: url });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error });
    }
  }

  @Get(':hash')
  async redirectToLongURL(@Req() req: Request, @Res() res: Response) {
    try {
      const { hash } = req.params;
      if (!hash) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'URL is required' });
      }

      const url = await this.urlShortenerService.getURL(hash);

      if (!url) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'URL not found for the provided hash' });
      }

      // Update the click count (could be saved in Redis for later periodic update)
      await this.urlShortenerService.updateClickCount(url);

      return res.status(HttpStatus.MOVED_PERMANENTLY).redirect(url);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error });
    }
  }
}

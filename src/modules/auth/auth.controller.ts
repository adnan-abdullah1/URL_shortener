import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @Version('v1')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return 'Google login';
  }
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const { email, firstName, lastName, picture } = req.user;
    const id = uuidv4();
    try {
      await this.authService.saveUser({
        id,
        email,
        firstName,
        lastName,
        picture,
      });
      // calling api on same server and passing id email for token generation
      const token = await this.authService.signToken({ email });
      res.cookie('auth_token', token, { httpOnly: true, secure: true });
      return res.redirect(`/url-shortener/`);
    } catch (error) {
      return res.json(error);
    }
  }

  @Get('/login')
  async redirectToLogin(@Req() req: Request, @Res() res: Response) {
    if (!req['user']?.isAuthorized)
      return res.status(HttpStatus.UNAUTHORIZED).render('index');
    return res.status(HttpStatus.OK).render('url-shortener');
  }
}

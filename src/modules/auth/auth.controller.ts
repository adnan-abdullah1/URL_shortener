import { Controller, Get, Req, Res, UseGuards, Version } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';

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
      const user = await this.authService.saveUser({
        id,
        email,
        firstName,
        lastName,
        picture,
      });
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }
}

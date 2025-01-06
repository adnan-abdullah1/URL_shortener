import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/enum/user-type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}
  @Get('google')
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
        userType: UserType.Google,
      });

      // again find user above might have been already existing user, so we need id for token creation
      const userData = await this.userService.findUser(email);

      // calling api on same server and passing id email for token generation
      const token = await this.authService.signToken({
        email,
        userId: userData.id,
      });

      res.cookie('auth_token', token, { httpOnly: true, secure: true });
      return res.redirect(`/url-shortener/`);
    } catch (error) {
      return res.json(error);
    }
  }

  @Get('/login')
  async redirectToLogin(@Req() req: Request, @Res() res: Response) {
    const token = this.authService.extractTokenFromCookie(req);

    if (!token) return res.status(HttpStatus.UNAUTHORIZED).render('index');
    const isValidToken = await this.authService.verifyToken(token);
    if (!isValidToken)
      return res.status(HttpStatus.UNAUTHORIZED).render('index');

    return res.status(HttpStatus.OK).render('url-shortener');
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    // gets users password
    const user = await this.userService.findUser(email, ['password']);
    if (!user || !user.password) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordMatch = await this.authService.verifyPasswordHash(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credential' });
    }

    // create token and add to cookie
    const token = await this.authService.signToken({ email, userId: user.id });
    res.cookie('auth_token', token, { httpOnly: true, secure: true });

    return res.status(HttpStatus.CREATED).json({ login: true });
  }

  @Get('/register')
  async redirectToRegistration(@Req() req: Request, @Res() res: Response) {
    return res.render('registration');
  }

  @Post('/register')
  async registerUser(@Req() req: Request, @Res() res: Response) {
    const { email, firstName, lastName, password } = req.body;
    const id = uuidv4();

    try {
      const hash = await this.authService.hashPassword(password);
      const userExists = await this.userService.findUser(email);
      if (userExists) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'user already exists' });
      }

      await this.authService.saveUser({
        id,
        firstName,
        lastName,
        email,
        password: hash,
        userType: UserType.System,
      });

      return res.status(HttpStatus.CREATED).json({ message: 'created' });
    } catch (error) {
      console.error('Error registering user:', error);

      return res.status(500).render('error', {
        message: 'An error occurred while registering the user.',
      });
    }
  }
}

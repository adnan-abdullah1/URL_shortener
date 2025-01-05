import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Save user to database
   * @param user
   * @returns Promise<User>>
   */
  saveUser(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  }) {
    const data = {
      id: user.id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      picture: user.picture,
    };
    return this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(data)
      .orIgnore()
      .execute();
  }
  signToken(payload: { email: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
  }

  extractTokenFromCookie(request: Request): string | undefined {
    const tokenStr = request.headers.cookie
      ?.split(';')
      .find((el) => el.includes('auth_token'));

    if (!tokenStr) return undefined;
    const val = tokenStr?.split('=')[1]; // splits like ['auth_token','token_value']
    return val ?? undefined;
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return true;
    } catch {
      return false;
    }
  }
}

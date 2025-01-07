import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/enum/user-type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Save user to database, when use comes via google OAUTH
   * @param user
   * @returns Promise<User>>
   */
  saveUser(user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    picture?: string;
    password?: string;
    userType: UserType;
  }) {
    const data = {
      id: user.id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      picture: user.picture,
      password: user.password,
      user_type: user.userType,
    };
    return this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(data)
      .orIgnore()
      .execute();
  }
  
  signToken(payload: { email: string; userId: string }) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
  }

  // Extracts token from cookie
  extractTokenFromCookie(request: Request): string | undefined {
    const tokenStr = request.headers.cookie
      ?.split(';')
      .find((el) => el.includes('auth_token'));

    if (!tokenStr) return undefined;
    const val = tokenStr?.split('=')[1]; // splits like ['auth_token','token_value'] and gets index 1
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
  
  async hashPassword(password: string) {
    return bcrypt.hash(password, parseInt(process.env.SAlT_ROUNDS));
  }

  async verifyPasswordHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

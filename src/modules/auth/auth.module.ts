import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User } from 'src/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { URL } from 'src/models/url.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, URL]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleStrategy } from './google.strategy';
import { User } from './models/user.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UrlShortenerModule } from './modules/url-shortener/url-shortener/url-shortener.module';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/models/*{.ts,.js}'], // include all models
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      // connection pool configuration, this configuration needs to be benchmarked to get full potential
      extra: {
        max: 1000,
        min: 1000,
        idleTimeoutMillis: 30000, // close idle clients after 30 seconds
        connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be established
      },
    }),
    // cache module, use redis as cache store
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10),
          },
        });
        return {
          store: store as unknown as CacheStore,
          ttl: 60 * 60 * 24, // valid for one day
        };
      },
    }),
    // all 5 requests in 60 seconds from one ip address
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 5,
      },
    ]),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UrlShortenerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}

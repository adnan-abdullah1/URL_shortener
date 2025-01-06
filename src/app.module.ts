import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './google.strategy';
import { User } from './models/user.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UrlShortenerModule } from './modules/url-shortener/url-shortener/url-shortener.module';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { UserService } from './user/user.service';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { URL } from './models/url.entity';

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
        max: 5,
        min: 100,
        idleTimeoutM1000illis: 30000, // close idle clients after 30 seconds
        connectionTimeoutMillis: 10000, // return an error after 2 min if connection could not be established
      },
      ssl: {
        rejectUnauthorized: false,
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
    // allow concurrent 5 requests from one ip in 60 seconds
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    TypeOrmModule.forFeature([User, URL]),
    UrlShortenerModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    UserService,
  ],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpExceptionFilter } from './exceptions/http.exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'fatal', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // set rendering engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // serve static assets
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const config = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('The URL Shortener description')
    .setVersion('1.0')
    .addTag('URL Shortener')
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app
    .listen(port)
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  // use http exception filter at global level
  // so i don't need to import at each controller
  app.useGlobalFilters(new HttpExceptionFilter());
}

bootstrap();

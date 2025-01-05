import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'fatal', 'verbose'],
  });

  // set rendering engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // serve static assets
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: '',
    defaultVersion: '',
  });

  const config = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('The URL Shortener description')
    .setVersion('1.0')
    .addTag('URL Shortener')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app
    .listen(port)
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log(`Server is running on http://localhost:${port}`);
    });
}

bootstrap();

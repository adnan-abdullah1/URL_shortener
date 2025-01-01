import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'fatal', 'verbose'],
  });

  // enable security middleware
  app.use(helmet());

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
  console.log(port, process.env);
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

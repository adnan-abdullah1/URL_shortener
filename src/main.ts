import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'fatal', 'verbose'],
  });

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

  // new Request('http://localhost:3001/url-shortener/', {
  //   method: 'POST',
  //   body: JSON.stringify({ url: 'example' }),
  // });

  // setInterval(()=>{
  //   const response =  fetch('http://localhost:3001/url-shortener/', {
  //     method: 'POST',
  //     body: JSON.stringify({ url: 'example'+Math.random() }),
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // },100);
}

bootstrap();

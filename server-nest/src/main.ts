import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(3000);
}
bootstrap();

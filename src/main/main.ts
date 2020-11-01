import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import AppConfig from './modules/app-config/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API Specifications')
    .setDescription('Student Enrollment API Documentation')
    .setVersion('1.0')
    .addTag('SRS')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  const appConfig = app.get(AppConfig);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.startAllMicroservicesAsync();
  await app.listen(appConfig.getAppPort());
}
bootstrap().then();

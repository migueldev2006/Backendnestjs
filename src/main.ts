import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


   app.enableCors({
    origin: process.env.BASE_URL, 
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
    transformOptions:{
      enableImplicitConversion:true
  }}))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

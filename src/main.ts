import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as dotenv from 'dotenv';
import { MyLogger } from './common/logger';

async function bootstrap() {
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  dotenv.config();

  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useLogger(app.get(MyLogger));

  // TODO: FIX .ENV

  app.use(cookieParser());
  app.use(
    session({
      secret: '1111',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true, httpOnly: true },
    }),
  );


  app.setGlobalPrefix('manhtuanservice/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

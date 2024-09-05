import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  BrandModule,
  DiscountModule,
  ProductModule,
  ServiceModule,
  UserModule,
  VarientModule,
} from './domain';
import { DatabaseModule, RedisModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, RolesGuard } from './domain/guard';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './common/logger';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduledTasksService } from './domain/user/schedule.task.service';
import { SessionCodeRepository } from './database/repository';

// TODO: FIX .ENV
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    RedisModule,
    UserModule,
    ServiceModule,
    AuthModule,
    BrandModule,
    DiscountModule,
    ProductModule,
    VarientModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    SessionCodeRepository,
    ScheduledTasksService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }

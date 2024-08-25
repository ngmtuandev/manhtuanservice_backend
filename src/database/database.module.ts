import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ServiceEntity,
  SessionCodeEntity,
  UserEntity,
} from './entity';

// TODO: FIX .ENV
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Manhtuan123***',
      database: 'manhtuanservice',
      entities: [
        UserEntity,
        SessionCodeEntity,
        ServiceEntity
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule { }

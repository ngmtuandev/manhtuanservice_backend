import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BrandEntity,
  CartEntity,
  CartItemEntity,
  CommentEntity,
  DiscountEntity,
  NewsEntity,
  ProductEntity,
  ProductVarientEntity,
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
        ServiceEntity,
        BrandEntity,
        ProductEntity,
        DiscountEntity,
        ProductVarientEntity,
        NewsEntity,
        CommentEntity,
        CartEntity,
        CartItemEntity
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule { }

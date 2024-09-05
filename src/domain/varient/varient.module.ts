import { Module } from '@nestjs/common';
import { VarientService } from './varient.service';
import { VarientController } from './varient.controller';
import { ProductVarientRepository } from 'src/database/repository/product-varient.repository';
import { ProductRepository } from 'src/database/repository/product.repository';

@Module({
  controllers: [VarientController],
  providers: [VarientService, ProductVarientRepository, ProductRepository],
  imports: [],
})
export class VarientModule { }

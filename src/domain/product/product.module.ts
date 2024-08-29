import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from 'src/database/repository/product.repository';
import { ProductVarientRepository } from 'src/database/repository/product-varient.repository';


@Module({
    controllers: [ProductController],
    providers: [ProductService, ProductRepository, ProductVarientRepository],
    imports: [],
})
export class ProductModule { }

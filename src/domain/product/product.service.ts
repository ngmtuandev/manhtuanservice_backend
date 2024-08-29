import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/database/repository/product.repository';
import { BrandDto, CreateBrandDto } from 'src/infrastructure/dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async create(brandInfo: CreateBrandDto) {

    }

}

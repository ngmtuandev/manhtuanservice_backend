import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductVarientRepository } from 'src/database/repository/product-varient.repository';
import { ProductRepository } from 'src/database/repository/product.repository';

@Injectable()
export class VarientService {
  constructor(
    private readonly productVarientRepository: ProductVarientRepository,
    private readonly productRepository: ProductRepository,
  ) { }

  async findAll(productId: number) {
    let result = undefined;
    const varients = await this.productVarientRepository.findAll(productId);
    if (varients) result = varients;
    return result;
  }
}

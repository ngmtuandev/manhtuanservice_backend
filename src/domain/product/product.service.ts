import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { messageApi } from 'src/common/constant';
import { DiscountEntity, ProductEntity, ProductVarientEntity } from 'src/database/entity';
import { BrandRepository, DiscountRepository, ServiceRepository } from 'src/database/repository';
import { ProductVarientRepository } from 'src/database/repository/product-varient.repository';
import { ProductRepository } from 'src/database/repository/product.repository';
import { CreateProductRequestDto } from 'src/infrastructure/dto';
import { Connection } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly brandRepository: BrandRepository,
        private readonly productVarientRepository: ProductVarientRepository,
        private readonly discountRepository: DiscountRepository,
        private readonly serviceRepository: ServiceRepository,
        private readonly connection: Connection,
    ) { }

    async create(productInfo: CreateProductRequestDto) {
        const { brandId, description, discountId, info, name, productVarients, serviceId } = productInfo;

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const brand = await this.brandRepository.findById(brandId);
            const service = await this.serviceRepository.findById(serviceId);
            let discount: DiscountEntity | undefined;
            if (discountId) {
                discount = await this.discountRepository.findById(discountId);
            }

            if (!brand || !service) {
                throw new Error(messageApi.CREATE_PRODUCT_FAIL_FIELD);
            }

            const newProduct = plainToClass(ProductEntity, { name, info, description, brand, service, discount });

            const savedProduct = await queryRunner.manager.save(ProductEntity, newProduct);

            if (savedProduct) {
                const productVarientEntities = productVarients.map(varientDto => {

                    const varient = plainToClass(ProductVarientEntity, varientDto);
                    // throw error; test transaction
                    return varient;
                });

                await queryRunner.manager.save(ProductVarientEntity, productVarientEntities);
            }

            await queryRunner.commitTransaction();
            return savedProduct;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}

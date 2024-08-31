import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { messageApi } from 'src/common/constant';
import { DiscountEntity, ProductEntity, ProductVarientEntity } from 'src/database/entity';
import { BrandRepository, DiscountRepository, ServiceRepository } from 'src/database/repository';
import { ProductVarientRepository } from 'src/database/repository/product-varient.repository';
import { ProductRepository } from 'src/database/repository/product.repository';
import { CreateProductRequestDto, FindOneProductDto, PaginationInfinityDto, ResponseFindAllDto, ResponseProductDto } from 'src/infrastructure/dto';
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

    async findOne(findInfo: FindOneProductDto) {
        const product = await this.productRepository.findOne(findInfo.productId);
        if (!product) throw new NotFoundException(`Product with id ${findInfo.productId} not found`);

        let varientInfo;
        if (findInfo.variantId) {
            varientInfo = await this.productVarientRepository.findOne(product, findInfo.variantId);
            if (!varientInfo) throw new NotFoundException(`Varient with id ${findInfo.variantId} not found for product ${findInfo.productId}`);
        }
        else {
            varientInfo = product.productVarient[0];
        }

        const result = plainToInstance(ResponseProductDto, { ...product, varient: varientInfo })
        return result;
    }

    async findAll(paginationInfo: PaginationInfinityDto) {

        const { products } = await this.productRepository.findAll(paginationInfo);
        const hasNextPage = products.length > paginationInfo.limit;
        const paginatedProducts = hasNextPage ? products.slice(0, paginationInfo.limit) : products;
        const newNextPageToken = hasNextPage ? +paginationInfo.nextPageToken + +paginationInfo.limit : null;

        const result = plainToInstance(ResponseFindAllDto, { results: paginatedProducts, hasNextPage, nextPageToken: newNextPageToken })

        return result;

    }

    async
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { messageApi } from 'src/common/constant';
import { DiscountEntity, ProductEntity, ProductVarientEntity } from 'src/database/entity';
import { BrandRepository, DiscountRepository, ServiceRepository } from 'src/database/repository';
import { ProductVarientRepository } from 'src/database/repository/product-varient.repository';
import { ProductRepository } from 'src/database/repository/product.repository';
import { CreateProductRequestDto, FindOneProductDto, PaginationInfinityDto, ResponseFindAllDto, ResponseProductDto } from 'src/infrastructure/dto';
import { Connection, EntityManager } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly brandRepository: BrandRepository,
        private readonly productVarientRepository: ProductVarientRepository,
        private readonly discountRepository: DiscountRepository,
        private readonly serviceRepository: ServiceRepository,
        private readonly connection: Connection,
        private readonly entityManager: EntityManager,
    ) { }

    async create(productInfo: CreateProductRequestDto) {

        const { brandId, description, discountId, info, name, productVarients, serviceId, thumbnail } = productInfo;

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

            const newProduct = plainToClass(ProductEntity, { name, info, description, brand, service, discount, thumbnail });

            const savedProduct = await queryRunner.manager.save(ProductEntity, newProduct);

            if (savedProduct && productVarients) {
                const productVarientEntities = productVarients?.map(varientDto => {

                    const varient = plainToClass(ProductVarientEntity, { ...varientDto, product: newProduct });
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
        const product = await this.productRepository?.findOne(findInfo.productId);
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

    async filter(queryParams: any) {
        const { name, priceMin, priceMax, storage, brandId } = queryParams;
        const queryBuilder = this.entityManager
            .createQueryBuilder('product_entity', 'a')
            .select([
                'a.name',
                'a.id',
                'a.description',
                'a.thumbnail',
                'pv.color',
                'pv.storage',
                'pv.price',
                'pv.name',
                's.brand'
            ])
            .leftJoin('a.productVarient', 'pv')
            .leftJoin('a.brand', 's');

        if (name) {
            queryBuilder.andWhere('pv.name LIKE :name', { name: `%${name}%` });
        }

        if (priceMin !== undefined && priceMax !== undefined) {
            queryBuilder.andWhere('pv.price BETWEEN :priceMin AND :priceMax', { priceMin, priceMax });
        }

        if (storage !== undefined) {
            queryBuilder.andWhere('pv.storage = :storage', { storage });
        }

        if (brandId !== undefined) {
            queryBuilder.andWhere('s.id = :brandId', { brandId });
        }

        return await queryBuilder.getMany();
    }
}

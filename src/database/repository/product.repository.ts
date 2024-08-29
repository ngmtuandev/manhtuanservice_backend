import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { ProductEntity } from '../entity';
import { CreateProductDto } from 'src/infrastructure/dto';

export class ProductRepository extends GenericRepository<ProductEntity> {
    protected repository: Repository<ProductEntity>;

    getEntityType(): EntityTarget<ProductEntity> {
        return ProductEntity;
    }

    async create(productInfo: CreateProductDto) {
        let result = undefined;
        const product = await this.repository.save(productInfo);
        if (product) result = true;
        else result = false;
        return result;
    }

    async findOne(productId: number) {
        const product = await this.repository.findOne({
            where: { id: productId },
            relations: ['brand', 'service', 'productVarient', 'discounts'],

        })

        if (product) return product;
        return undefined;
    }

}

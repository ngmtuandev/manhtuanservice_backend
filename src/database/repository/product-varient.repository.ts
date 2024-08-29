import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { ProductVarientEntity } from '../entity';
import { CreateProductVarientDto } from 'src/infrastructure/dto';

export class ProductVarientRepository extends GenericRepository<ProductVarientEntity> {
    protected repository: Repository<ProductVarientEntity>;

    getEntityType(): EntityTarget<ProductVarientEntity> {
        return ProductVarientEntity;
    }

    async create(productVarientInfo: CreateProductVarientDto) {
        let result = undefined;
        const newProductVarient = await this.repository.save(productVarientInfo);
        if (newProductVarient) result = newProductVarient;
        return result;
    }

}

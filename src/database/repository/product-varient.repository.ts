import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { ProductVarientEntity } from '../entity';

export class ProductVarientRepository extends GenericRepository<ProductVarientEntity> {
    protected repository: Repository<ProductVarientEntity>;

    getEntityType(): EntityTarget<ProductVarientEntity> {
        return ProductVarientEntity;
    }

    async create() {

    }

}

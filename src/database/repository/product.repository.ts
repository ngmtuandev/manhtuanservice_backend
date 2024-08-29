import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { ProductEntity } from '../entity';

export class ProductRepository extends GenericRepository<ProductEntity> {
    protected repository: Repository<ProductEntity>;

    getEntityType(): EntityTarget<ProductEntity> {
        return ProductEntity;
    }

    async create() {

    }

}

import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { BrandEntity } from '../entity';
import {
    CreateBrandDto,
} from 'src/infrastructure/dto';

export class BrandRepository extends GenericRepository<BrandEntity> {
    protected repository: Repository<BrandEntity>;

    getEntityType(): EntityTarget<BrandEntity> {
        return BrandEntity;
    }

    async create(brandInfo: CreateBrandDto) {
        const result = await this.repository.save(brandInfo);
        return result;
    }

    async findAll() {
        const result = await this.repository.find();
        return result;
    }

    async findById(id: number) {
        const result = await this.repository.findOneBy({ id });
        return result;
    }

}

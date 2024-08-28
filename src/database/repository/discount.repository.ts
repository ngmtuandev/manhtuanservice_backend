import { EntityTarget, LessThan, MoreThan, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { DiscountEntity } from '../entity';
import {
    CreateDiscountDto,
} from 'src/infrastructure/dto';

export class DiscountRepository extends GenericRepository<DiscountEntity> {
    protected repository: Repository<DiscountEntity>;

    getEntityType(): EntityTarget<DiscountEntity> {
        return DiscountEntity;
    }

    async create(discountInfo: CreateDiscountDto) {
        const result = await this.repository.save(discountInfo);
        return result;
    }

    async findAllActive() {
        const currentDate = new Date();
        const result = await this.repository.find({
            where: { endDate: MoreThan(currentDate) }
        });
        return result;
    }

    async findExpired() {
        let result = undefined;
        const currentDate = new Date();
        const expiredDiscounts = await this.repository.find({
            where: { endDate: LessThan(currentDate) }
        });
        if (expiredDiscounts) {
            await this.repository.remove(expiredDiscounts);
            result = true
        }
        else result = false;
        return result;
    }

}

import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { CartEntity } from '../entity';
import { CreateCartDto, FindCartDto } from 'src/infrastructure/dto';

export class CartRepository extends GenericRepository<CartEntity> {

    protected repository: Repository<CartEntity>;

    getEntityType(): EntityTarget<CartEntity> {
        return CartEntity;
    }

    async create(cartInfo: CreateCartDto) {

        const result = await this.repository.save(cartInfo);
        if (result) return result;
    }

    async findOne(findInfo: FindCartDto) {

        let result = undefined;
        const cart = await this.repository.findOne({ where: { user: { id: findInfo.userId } }, relations: ['items', 'items.product'] })
        if (cart) result = cart;
        return result;
    }

    async update(infoUpdate: any) {
        const result = await this.repository.update({ id: infoUpdate?.id }, { ...infoUpdate })
        return result;
    }

}

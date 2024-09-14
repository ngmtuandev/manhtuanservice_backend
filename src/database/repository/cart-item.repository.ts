import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { CartItemEntity } from '../entity';
import { CreateCartItemDto } from 'src/infrastructure/dto';

export class CartItemRepository extends GenericRepository<CartItemEntity> {

    protected repository: Repository<CartItemEntity>;

    getEntityType(): EntityTarget<CartItemEntity> {
        return CartItemEntity;
    }

    async create(cartItemInfo: CreateCartItemDto) {

        let result = undefined;
        const cartItem = await this.repository.save(cartItemInfo);
        if (cartItem) result = cartItem;
        return result;
    }

}

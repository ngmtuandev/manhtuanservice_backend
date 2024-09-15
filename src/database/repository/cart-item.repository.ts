import { EntityTarget, Repository } from 'typeorm';
import { GenericRepository } from './generic.repository';
import { CartItemEntity } from '../entity';
import { CreateCartItemDto, DeleteItemDto } from 'src/infrastructure/dto';

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

    async checkProductInCart(cartId: number, productId: number) {

        const productInCart = await this.repository.find({ where: { product: { id: productId }, cart: { id: cartId } } })
        if (productInCart?.length > 0) {
            return 1;
        }
        return false
    }

    async deleteItem(deleteInfo: DeleteItemDto) {
        // console.log('deleteInfodeleteInfo ', deleteInfo)
        let result = undefined;
        const findProductInCart = await this.repository.find({ where: { product: { id: +deleteInfo?.productId }, cart: { id: +deleteInfo?.cartId } } })
        if (findProductInCart) {
            await this.repository.delete({ id: findProductInCart[0]?.id });
            result = true
        }
        return result;
    }

}

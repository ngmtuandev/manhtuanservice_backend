import { BadRequestException, Injectable } from '@nestjs/common';
import { CartItemRepository, CartRepository } from 'src/database/repository';
import { AddCartDto, DeleteItemDto, FindCartDto } from 'src/infrastructure/dto';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class CartService {

    constructor(
        private readonly cartRepository: CartRepository,
        private readonly cartItemRepository: CartItemRepository,
        private readonly dataSource: DataSource,
    ) { }

    async create(cartInfo: AddCartDto) {

        let result = undefined;
        let findUserInCart = { userId: cartInfo.cart.user.id };
        const findCart = await this.cartRepository.findOne(findUserInCart);
        if (findCart) {
            const checkProductInCart = await this.cartItemRepository.checkProductInCart(findCart?.id, +cartInfo?.cartItem?.product)
            if (!!checkProductInCart) {
                return checkProductInCart;
            }
            await this.cartItemRepository.create({ ...cartInfo.cartItem, cart: findCart });
            // if (cartItemNew) {
            //     const updateCart = { ...findCart, id: findCart.id, total: findCart.total }
            //     await this.cartRepository.update(updateCart)
            //     result = true;
            // }
        }
        else {
            const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                const cartNew = await this.cartRepository.create(cartInfo.cart);
                await this.cartItemRepository.create({ ...cartInfo.cartItem, cart: cartNew });
                await queryRunner.commitTransaction();
                result = true;
            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw new BadRequestException('Failed to create cart');
            }
            finally {
                await queryRunner.release();
            }
        }
        return result;
    }

    async findOne(findInfo: FindCartDto) {
        const result = await this.cartRepository.findOne(findInfo);
        return result;
    }

    async delete(deleteInfo: DeleteItemDto) {
        const result = await this.cartItemRepository.deleteItem(deleteInfo);
        return result;
    }

}

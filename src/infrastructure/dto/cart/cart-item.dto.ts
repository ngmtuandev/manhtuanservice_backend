import { IsNotEmpty } from 'class-validator';
import { ProductVarientEntity } from 'src/database/entity';
import { CartEntity } from 'src/database/entity/cart.entity';

export class CartItemDto {
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    price?: number;

    @IsNotEmpty()
    product: ProductVarientEntity;

    @IsNotEmpty()
    cart: CartEntity;
}

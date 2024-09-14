import { IsNotEmpty } from 'class-validator';
import { CartEntity, ProductVarientEntity } from 'src/database/entity';

export class CreateCartItemDto {
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    price?: number;

    @IsNotEmpty()
    product: ProductVarientEntity;

    cart: CartEntity;
}

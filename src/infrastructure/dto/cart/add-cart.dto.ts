import { IsNotEmpty } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';
import { CreateCartItemDto } from './create-cart-item.dto';

export class AddCartDto {

    @IsNotEmpty()
    cart: CreateCartDto;

    @IsNotEmpty()
    cartItem: CreateCartItemDto;
}

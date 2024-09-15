import { IsNotEmpty } from 'class-validator';

export class DeleteItemDto {
    @IsNotEmpty()
    cartId: number;

    @IsNotEmpty()
    productId: number;
}

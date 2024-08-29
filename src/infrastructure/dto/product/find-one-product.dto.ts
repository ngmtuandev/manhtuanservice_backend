import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FindOneProductDto {
    @Expose({ name: 'productId' })
    @IsNotEmpty()
    productId: number;

    @Expose({ name: 'variantId' })
    variantId: number;

}

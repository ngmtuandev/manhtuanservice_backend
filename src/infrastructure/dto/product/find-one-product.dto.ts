import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindOneProductDto {
    @Expose({ name: 'productId' })
    @IsOptional()
    productId: number;

    @Expose({ name: 'variantId' })
    variantId: number;

}

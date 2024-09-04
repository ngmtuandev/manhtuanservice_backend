import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ProductEntity } from 'src/database/entity';

export class ProductVarientDto {
    @Expose({ name: 'name' })
    @IsNotEmpty()
    name: string;

    @Expose({ name: 'price' })
    @IsNotEmpty()
    price: number;

    @Expose({ name: 'color' })
    @IsNotEmpty()
    color: string;

    @Expose({ name: 'storage' })
    @IsNotEmpty()
    storage: number;

    @Expose({ name: 'product' })
    @IsNotEmpty()
    product: ProductEntity;

}

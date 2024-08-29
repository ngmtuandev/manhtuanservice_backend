import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateProductVarientDto {
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


}

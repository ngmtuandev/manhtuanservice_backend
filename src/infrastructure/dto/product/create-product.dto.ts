import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ProductVarientEntity } from 'src/database/entity';

export class CreateProductDto {
    @Expose({ name: 'name' })
    @IsNotEmpty()
    name: string;

    @Expose({ name: 'info' })
    @IsNotEmpty()
    info: string;

    @Expose({ name: 'description' })
    @IsNotEmpty()
    description: string;

    @Expose({ name: 'brandId' })
    @IsNotEmpty()
    @IsNumber()
    brandId: number;

    @Expose({ name: 'serviceId' })
    @IsNotEmpty()
    @IsNumber()
    serviceId: number;

    @Expose({ name: 'discountId' })
    @IsNotEmpty()
    @IsNumber()
    discountId: number;

    @Expose({ name: 'productVarient' })
    @IsNotEmpty()
    @IsNumber()
    productVarient: ProductVarientEntity[];

}

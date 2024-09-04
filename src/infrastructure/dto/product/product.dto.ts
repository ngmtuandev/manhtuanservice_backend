import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { BrandEntity, DiscountEntity, ProductVarientEntity, ServiceEntity } from 'src/database/entity';

export class ProductDto {
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
    brand: BrandEntity;

    @Expose({ name: 'serviceId' })
    @IsNotEmpty()
    @IsNumber()
    service: ServiceEntity;

    @Expose({ name: 'thumbnail' })
    thumbnail: string

    @Expose({ name: 'discountId' })
    @IsNotEmpty()
    @IsNumber()
    discount: DiscountEntity;

    @Expose({ name: 'productVarient' })
    @IsNumber()
    productVarient: ProductVarientEntity[];

}

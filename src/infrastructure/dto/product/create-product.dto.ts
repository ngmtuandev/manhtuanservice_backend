import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { BrandEntity, DiscountEntity, ProductVarientEntity, ServiceEntity } from 'src/database/entity';
import { CreateProductVarientDto } from '../product-varient/create-product-varient.dto';

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
    brand: BrandEntity;

    @Expose({ name: 'serviceId' })
    @IsNotEmpty()
    @IsNumber()
    service: ServiceEntity;

    @Expose({ name: 'discountId' })
    @IsOptional()
    @IsNumber()
    discount: DiscountEntity;

}

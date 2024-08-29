import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { ProductVarientEntity } from 'src/database/entity';
import { CreateProductVarientDto } from '../product-varient/create-product-varient.dto';

export class CreateProductRequestDto {
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
    @IsOptional()
    @IsNumber()
    discountId: number;

    @Expose({ name: 'productVarients' })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVarientDto)
    productVarients: CreateProductVarientDto[];

}

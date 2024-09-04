import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { BrandEntity, DiscountEntity, ProductVarientEntity, ServiceEntity } from 'src/database/entity';
import { BrandDto } from '../brand/brand.dto';
import { ServiceDto } from '../service/service.dto';
import { DiscountDto } from '../discount/discount.dto';
import { ProductVarientDto } from '../product-varient/product-varient.dto';

export class ResponseProductDto {

    name: string;

    info: string;

    description: string;

    @Expose({ name: 'brand' })
    brand: BrandDto;

    @Expose({ name: 'service' })
    service: ServiceDto;

    discount: DiscountDto;

    @Exclude()
    productVarient: any;

    varient: ProductVarientDto

}

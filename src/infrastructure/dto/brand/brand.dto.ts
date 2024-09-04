import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class BrandDto {
    @Expose({ name: 'brand' })
    @IsNotEmpty()
    brand: string;
}

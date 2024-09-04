import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
    @Expose({ name: 'brand' })
    @IsNotEmpty()
    brand: string;
}

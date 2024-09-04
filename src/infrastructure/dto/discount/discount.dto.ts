import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DiscountDto {

    @Expose({ name: 'percentage' })
    @IsNotEmpty()
    percentage: number;

    @Expose({ name: 'startDate' })
    @IsNotEmpty()
    startDate: Date;

    @Expose({ name: 'endDate' })
    @IsNotEmpty()
    endDate: Date;
}

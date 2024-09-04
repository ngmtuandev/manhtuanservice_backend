import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
    @Expose({ name: 'serviceName' })
    @IsNotEmpty()
    serviceName: string;

    @Expose({ name: 'url' })
    @IsNotEmpty()
    url: string;
}

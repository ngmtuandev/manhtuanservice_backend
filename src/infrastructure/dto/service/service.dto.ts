import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ServiceDto {
    @Expose({ name: 'serviceName' })
    @IsNotEmpty()
    serviceName: string;

    @Expose({ name: 'url' })
    @IsNotEmpty()
    url: string;
}

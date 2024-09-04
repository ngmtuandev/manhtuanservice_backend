import { IsNotEmpty } from 'class-validator';

export class UpdateServiceDto {
    @IsNotEmpty()
    serviceName: string;

    @IsNotEmpty()
    id: number;
}

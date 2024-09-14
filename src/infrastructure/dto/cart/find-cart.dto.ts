import { IsNotEmpty } from 'class-validator';

export class FindCartDto {
    @IsNotEmpty()
    userId: number;
}

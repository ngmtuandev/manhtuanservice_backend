import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FindNewsDto {

    @Expose({ name: 'newsId' })
    @IsNotEmpty()
    newsId: number;

}

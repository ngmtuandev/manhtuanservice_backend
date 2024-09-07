import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {

    @Expose({ name: 'view' })
    @IsNotEmpty()
    view: number;

    @Expose({ name: 'title' })
    @IsNotEmpty()
    title: string;

    @Expose({ name: 'thumbnail' })
    @IsNotEmpty()
    thumbnail: string;

    @Expose({ name: 'content' })
    @IsNotEmpty()
    content: string;

    @Expose({ name: 'like' })
    like: number;
}

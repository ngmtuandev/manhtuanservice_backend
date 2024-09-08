import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNewsDto {

    @Expose({ name: 'view' })
    @IsOptional()
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
    @IsOptional()
    like: number;
}

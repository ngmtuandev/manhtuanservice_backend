import { Module } from '@nestjs/common';
import { NewsRepository } from 'src/database/repository';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
    controllers: [NewsController],
    providers: [NewsService, NewsRepository],
    imports: [],
})
export class NewsModule { }

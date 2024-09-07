import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NewsRepository } from 'src/database/repository';
import { CreateNewsDto, FindNewsDto, PaginationInfinityDto, ResponseFindAllDto } from 'src/infrastructure/dto';

@Injectable()
export class NewsService {
    constructor(
        private readonly newsRepository: NewsRepository,
    ) { }

    async create(newsInfo: CreateNewsDto) {
        let result = undefined;
        const news = await this.newsRepository.create(newsInfo);
        if (news) {
            result = news;
        }
        return result;
    }

    async findAll(paginationInfo: PaginationInfinityDto) {
        const { news } = await this.newsRepository.findAll(paginationInfo);

        const hasNextPage = news.length > paginationInfo.limit;
        const paginatedProducts = hasNextPage ? news.slice(0, paginationInfo.limit) : news;
        const newNextPageToken = hasNextPage ? +paginationInfo.nextPageToken + +paginationInfo.limit : null;

        const result = plainToInstance(ResponseFindAllDto, { results: paginatedProducts, hasNextPage, nextPageToken: newNextPageToken })

        return result;
    }

    async findOne(findNews: FindNewsDto) {

        let result = undefined;
        const news = await this.newsRepository.findOne(findNews.newsId);
        if (news) {
            result = news;
        }
        return result;
    }

}

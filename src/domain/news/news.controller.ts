import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateNewsDto, FindNewsDto, PaginationInfinityDto } from 'src/infrastructure/dto';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth, Roles } from 'src/common/decorators';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Roles(ROLE_CODE.Admin)
    @Post()
    async create(@Body() createNewsDto: CreateNewsDto) {
        try {
            const news = await this.newsService.create(createNewsDto);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                news,
                undefined,
                true,
            );
        } catch (error) {
            return new Response(
                STATUS_CODE.FAILURE,
                null,
                messageApi.FAIL,
                undefined,
                false,
            );
        }
    }

    @PublicAuth()
    @Get('find-all')
    async findAll(@Query() paginationInfo: PaginationInfinityDto) {
        try {
            const ressult = await this.newsService.findAll(paginationInfo);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                ressult,
                undefined,
                true,
            );
        } catch (error) {
            return new Response(
                STATUS_CODE.FAILURE,
                null,
                messageApi.FAIL,
                undefined,
                false,
            );
        }
    }

    @PublicAuth()
    @Get()
    async findOne(@Query() findNewsInfo: FindNewsDto) {
        try {
            const ressult = await this.newsService.findOne(findNewsInfo);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                ressult,
                undefined,
                true,
            );
        } catch (error) {
            return new Response(
                STATUS_CODE.FAILURE,
                null,
                messageApi.FAIL,
                undefined,
                false,
            );
        }
    }
}

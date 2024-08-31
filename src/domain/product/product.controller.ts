import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth, Roles } from 'src/common/decorators';
import { ProductService } from './product.service';
import { CreateProductDto, CreateProductRequestDto, FindOneProductDto, PaginationInfinityDto } from 'src/infrastructure/dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Roles(ROLE_CODE.Admin)
    @Post()
    async create(@Body() productInfo: CreateProductRequestDto) {
        try {
            const result = await this.productService.create(productInfo);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                result,
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
    async findOne(@Query() productInfo: FindOneProductDto) {
        try {
            const result = await this.productService.findOne(productInfo);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                result,
                undefined,
                true,
            );
        } catch (error) {
            // console.log('error : ', error)
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
            const result = await this.productService.findAll(paginationInfo);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                result,
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
    @Get('filter')
    async filter(@Query() queryParams: any) {
        try {
            const result = await this.productService.filter(queryParams);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                result,
                undefined,
                true,
            );
        } catch (error) {
            // console.log('error: ', error)
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

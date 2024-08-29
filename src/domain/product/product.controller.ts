import { Body, Controller, Post } from '@nestjs/common';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { Roles } from 'src/common/decorators';
import { ProductService } from './product.service';
import { CreateProductDto, CreateProductRequestDto } from 'src/infrastructure/dto';

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
            console.log('error : ', error)
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

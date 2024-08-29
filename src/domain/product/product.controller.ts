import { Controller, Post } from '@nestjs/common';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { Roles } from 'src/common/decorators';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Roles(ROLE_CODE.Admin)
    @Post()
    async create() {
        try {

            // return new Response(
            //     STATUS_CODE.SUCCESS,
            //     undefined,
            //     brandNew,
            //     undefined,
            //     true,
            // );
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

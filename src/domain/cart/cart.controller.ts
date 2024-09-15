import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AddCartDto, DeleteItemDto, FindCartDto } from 'src/infrastructure/dto';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { Roles } from 'src/common/decorators';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Roles(ROLE_CODE.Client)
    @Post()
    async create(@Body() createInfo: AddCartDto) {
        try {
            const cartNew = await this.cartService.create(createInfo);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                cartNew,
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

    @Roles(ROLE_CODE.Client)
    @Get()
    async findOne(@Query() findCartInfo: FindCartDto) {
        try {
            const cart = await this.cartService.findOne(findCartInfo);
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                cart,
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

    @Roles(ROLE_CODE.Client)
    @Delete()
    async delete(@Query() deleteInfo: DeleteItemDto) {
        try {
            const result = await this.cartService.delete(deleteInfo);
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
}

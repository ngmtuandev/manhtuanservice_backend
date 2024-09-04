import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDiscountDto, LoginUserDto } from 'src/infrastructure/dto';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth, Roles } from 'src/common/decorators';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) { }

    @Roles(ROLE_CODE.Admin)
    @Post()
    async create(@Body() discountInfo: CreateDiscountDto) {
        try {
            const result = await this.discountService.create(discountInfo);
            if (result) {
                return new Response(
                    STATUS_CODE.SUCCESS,
                    undefined,
                    result,
                    undefined,
                    true,
                );
            }
            else {
                return new Response(
                    STATUS_CODE.FAILURE,
                    null,
                    messageApi.FAIL,
                    undefined,
                    false,
                );
            }

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
    async findAll() {
        try {
            const result = await this.discountService.findAll();
            if (result) {
                return new Response(
                    STATUS_CODE.SUCCESS,
                    undefined,
                    result,
                    undefined,
                    true,
                );
            }
            else {
                return new Response(
                    STATUS_CODE.FAILURE,
                    null,
                    messageApi.FAIL,
                    undefined,
                    false,
                );
            }

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

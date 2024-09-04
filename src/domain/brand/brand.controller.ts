import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBrandDto, LoginUserDto } from 'src/infrastructure/dto';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth, Roles } from 'src/common/decorators';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @Roles(ROLE_CODE.Admin)
    @Post()
    async create(@Body() brandInfo: CreateBrandDto) {
        try {
            const brandNew = await this.brandService.create(brandInfo)
            return new Response(
                STATUS_CODE.SUCCESS,
                undefined,
                brandNew,
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
    async findAll() {
        try {
            const ressult = await this.brandService.findAll();
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

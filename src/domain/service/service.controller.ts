import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto } from 'src/infrastructure/dto';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth, Roles } from 'src/common/decorators';
import { ServiceService } from './service.service';
import { IdDto } from 'src/common/dto';

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @Roles(ROLE_CODE.Admin)
    @Post()
    async create(@Body() serviceInfo: CreateServiceDto) {
        try {
            const result = await this.serviceService.create(serviceInfo);
            if (result)
                return new Response(
                    STATUS_CODE.SUCCESS,
                    undefined,
                    undefined,
                    undefined,
                    true,
                );
            return new Response(
                STATUS_CODE.FAILURE,
                null,
                messageApi.FAIL,
                undefined,
                false,
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

    @Roles(ROLE_CODE.Admin)
    @Delete()
    async delete(@Body() id: IdDto) {
        try {
            const result = await this.serviceService.delete(id);
            if (result)
                return new Response(
                    STATUS_CODE.SUCCESS,
                    undefined,
                    result,
                    undefined,
                    true,
                );
            return new Response(
                STATUS_CODE.FAILURE,
                null,
                messageApi.FAIL,
                undefined,
                false,
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

    @Roles(ROLE_CODE.Admin)
    @Put()
    async update(@Body() updateInfo: UpdateServiceDto) {
        try {
            const result = await this.serviceService.update(updateInfo.id, updateInfo.serviceName);
            if (result)
                return new Response(
                    STATUS_CODE.SUCCESS,
                    undefined,
                    result,
                    undefined,
                    true,
                );
            return new Response(
                STATUS_CODE.FAILURE,
                null,
                messageApi.FAIL,
                undefined,
                false,
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
            const result = await this.serviceService.findAll();
            if (result)
                return new Response(
                    STATUS_CODE.SUCCESS,
                    undefined,
                    result,
                    undefined,
                    true,
                );
            return new Response(
                STATUS_CODE.FAILURE,
                null,
                messageApi.FAIL,
                undefined,
                false,
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

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginUserDto } from 'src/infrastructure/dto';
import { VarientService } from './varient.service';
import { STATUS_CODE } from 'src/infrastructure/enum';
import { messageApi, Response } from 'src/common/constant';
import { PublicAuth } from 'src/common/decorators';

@Controller('varients')
export class VarientController {
  constructor(private readonly varientService: VarientService) { }

  @PublicAuth()
  @Get('find-all')
  async findAll(@Query() queryInfo: any) {
    try {
      const varients = await this.varientService.findAll(+queryInfo?.productId);
      return new Response(
        STATUS_CODE.SUCCESS,
        undefined,
        varients,
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

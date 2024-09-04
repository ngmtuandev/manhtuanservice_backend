import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from 'src/infrastructure/dto';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { messageApi, Response } from 'src/common/constant';
import { ROLE_CODE, STATUS_CODE } from 'src/infrastructure/enum';
import { IdDto } from 'src/common/dto';
import { PublicAuth, Roles } from 'src/common/decorators';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @PublicAuth()
  @Post('register')
  async register(@Body() userInfo: CreateUserDto) {
    try {
      const result = await this.userService.register(userInfo);
      return new Response(
        STATUS_CODE.SUCCESS,
        result,
        messageApi.SUCCESS,
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
  @Post('confirm')
  async confirm(@Body('code') code: any) {
    try {
      const result = await this.userService.confirm(code);
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          undefined,
          messageApi.SUCCESS,
          undefined,
          true,
        );
      }
      return new Response(
        STATUS_CODE.FAILURE,
        undefined,
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

  @Get('info-current')
  async findInfoCurrent(@Request() req: Request) {
    try {
      const result = await this.userService.findCurrent(req);
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          messageApi.SUCCESS,
          result,
          undefined,
          true,
        );
      }
      return new Response(
        STATUS_CODE.FAILURE,
        undefined,
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

  @Patch('update-password')
  async updatePassword(@Body() updateInfo: UpdatePasswordDto) {
    try {
      const result = await this.userService.updatePassword(updateInfo);
      if (result) {
        return new Response(
          STATUS_CODE.SUCCESS,
          undefined,
          messageApi.SUCCESS,
          undefined,
          true,
        );
      }
      return new Response(
        STATUS_CODE.FAILURE,
        undefined,
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
  @Get('get-detail')
  async getDetail(@Body() id: IdDto) {
    try {
      const result = await this.userService.getDetail(id);
      return new Response(
        STATUS_CODE.SUCCESS,
        result,
        messageApi.SUCCESS,
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

  @Roles(ROLE_CODE.Admin)
  @Delete()
  async delete(@Body() id: IdDto) {
    try {
      await this.userService.delete(id);
      return new Response(
        STATUS_CODE.SUCCESS,
        undefined,
        messageApi.SUCCESS,
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

  @Roles(ROLE_CODE.Admin)
  @Get('find-all')
  async findAll() {
    try {
      const result = await this.userService.getAll();
      return new Response(
        STATUS_CODE.SUCCESS,
        messageApi.SUCCESS,
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

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(updateUserDto);
      return new Response(
        STATUS_CODE.SUCCESS,
        undefined,
        messageApi.SUCCESS,
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

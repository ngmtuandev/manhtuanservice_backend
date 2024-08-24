import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { isPassword, matchPassword } from 'src/common/decorators';
import { ROLE_CODE } from 'src/infrastructure/enum';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @isPassword()
  @IsNotEmpty()
  password: string;

  @matchPassword('password')
  @IsNotEmpty()
  passwordConfirm: string;

  @IsString()
  userName: string;

  @IsEnum(ROLE_CODE)
  @IsOptional()
  role?: ROLE_CODE | null = ROLE_CODE.Client;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar: string;
}

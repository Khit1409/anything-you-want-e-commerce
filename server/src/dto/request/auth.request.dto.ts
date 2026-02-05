import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { RoleDto } from '../common/auth.common.dto';

class RegisterUserAccountAddress {
  province: string;
  ward: string;
  addressDetail: string;
}

class RegisterUserAccountPhone {
  phoneNumber: string;
}

export class RegisterUserAccountRequestDto {
  @IsString()
  @IsNotEmpty()
  emailAddress: string;
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  dateOfBirth: Date | string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterUserAccountAddress)
  address: Array<RegisterUserAccountAddress>;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterUserAccountPhone)
  phones: Array<RegisterUserAccountPhone>;
}

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  emailAddress: string;
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @IsEnum(RoleDto)
  @IsNotEmpty()
  loginRole: RoleDto;
}

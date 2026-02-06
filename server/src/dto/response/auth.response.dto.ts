import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ResponseDto } from '../common/response.common.dto';
import { Type } from 'class-transformer';
import { RoleDto } from '../common/auth.common.dto';

export type TokenExpire = '1d' | '1h' | number;

export class LoginResponseDto extends ResponseDto {
  @IsOptional()
  @Type(() => LoginDataResponseDto)
  data?: LoginDataResponseDto;
  @IsString()
  token: string;
}
export class LoginDataResponseDto {
  @IsEnum(RoleDto)
  role: RoleDto;
}
export class CookieValueLoginResponse {
  @IsString()
  token: string;
  @IsString()
  tokenName: string;
}

export class AuthenticationResponseDto extends ResponseDto {
  @IsOptional()
  @Type(() => AuthenticationDataDto)
  data?: AuthenticationDataDto;
}

export class AuthenticationDataDto {
  @IsString()
  email: string;
  @IsString()
  uid: string;
  @IsEnum(RoleDto)
  role: RoleDto;
}
export class ProfileDataResponseDto {
  @IsString()
  id: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  fullName: string;
  @IsString()
  dateOfBirth: Date | string;
  @IsOptional()
  avatar?: string;
}
/**
 * response to client
 */
export class ProfileResponseDto extends ResponseDto {
  @IsOptional()
  @Type(() => ProfileDataResponseDto)
  data?: ProfileDataResponseDto;
}
export class RegisterUserAccountResponseDto extends ResponseDto {
  readonly;
}

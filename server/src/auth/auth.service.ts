import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AxiosError } from 'axios';
// import axios from 'axios';
import { Request } from 'express';
import { axiosClient } from 'src/config/axios.config';
import type {
  LoginDto,
  LoginResponseDto,
  LoginApiResponseDto,
  AuthenticationResponseDto,
  AuthenticationDataDto,
  ProfileApiResponseDto,
  GetProfileResponseDto,
  LoginErrorResponseDto,
} from 'src/dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  /**
   * client login
   * @param dto
   * @returns
   */
  async clientLogin(dto: LoginDto): Promise<LoginResponseDto> {
    const { loginRole, currentPassword, emailAddress } = dto;
    console.table([{ loginRole, currentPassword, emailAddress }]);
    try {
      const apiRes: { data: LoginApiResponseDto; error: AxiosError } =
        await axiosClient.post(`/auth/login/${loginRole}`, {
          current_password: currentPassword,
          email_address: emailAddress,
        });

      if (apiRes.error) {
        console.log(apiRes.error.message);
        throw new Error(apiRes.error.message);
      }

      const api: LoginApiResponseDto = apiRes.data;

      console.log(api);

      const { message, success, data, timestamp } = api;

      console.table([{ message, success, data, timestamp }]);

      const { email_address, exp, role, sub } = data;

      const tokenPayload = {
        uid: sub,
        role: role,
        email: email_address,
      };

      const tokenName = role + '_access_token';

      const token = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: exp,
      });

      const cookieValue = {
        tokenName,
        token,
      };

      return {
        status: 200,
        cookieValue,
        message: message,
        success: success,
        timestamp: new Date(),
      };
    } catch (error) {
      const errorRes = error as LoginErrorResponseDto;
      const { data, status } = errorRes.response;
      return {
        message: data.message,
        status: status,
        success: data.success,
        timestamp: new Date(data.timestamp),
      };
    }
  }
  /**
   * authentication
   */
  async clientAuth(token: string): Promise<AuthenticationResponseDto> {
    try {
      if (!token)
        return {
          message: 'Token is not found, can be is not login or expire token!',
          status: 401,
          success: false,
          timestamp: new Date(),
        };
      const decoded: AuthenticationDataDto =
        await this.jwtService.verifyAsync(token);
      if (!decoded) {
        return {
          message: "can't verify token!",
          success: false,
          status: 404,
          timestamp: new Date(),
        };
      }
      return {
        message: 'Verify is successfully!',
        success: true,
        status: 200,
        data: decoded,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        message: error as string,
        success: false,
        status: 500,
        timestamp: new Date(),
      };
    }
  }
  /**
   * get uid
   */
  async id(token: string) {
    const decoded = await this.clientAuth(token);
    if (!decoded) throw new InternalServerErrorException('Token not found!');
    return decoded.data?.uid;
  }
  /**
   * get profile
   */
  async getProfile(
    role: 'user' | 'seller',
    req: Request,
  ): Promise<GetProfileResponseDto> {
    const res: { data: ProfileApiResponseDto } = await axiosClient.get(
      `/auth/profile/${role}`,
      { headers: { Cookie: req.headers.cookie } },
    );
    const { data, message, success } = res.data;
    console.table([{ data, message, success }]);
    if (!data) {
      return { message, success, status: 401 };
    }
    return { message, success, status: 200, data };
  }
}

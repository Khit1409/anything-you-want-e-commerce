import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { authCookieConfig } from 'src/config/cookie.config';
import {
  LoginRequestDto,
  RegisterUserAccountRequestDto,
} from 'src/dto/request/auth.request.dto';
import { LoginResponseDto } from 'src/dto/response/auth.response.dto';
import { RoleDto } from 'src/dto/common/auth.common.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result:
      | (LoginResponseDto & {
          status: number;
        })
      | null = null;
    if (dto.loginRole === RoleDto.SELLER) {
      result = await this.authService.sellerLogin(dto);
    } else {
      const sessionId = req.sessionId;
      result = await this.authService.clientLogin(dto, sessionId);
    }
    if (!result) {
      return res.status(404).json({
        message: 'Role is not get or some thing error',
        timestamp: new Date().toLocaleDateString('vi-VN'),
        success: false,
      });
    }
    const { message, success, timestamp, cookieValue, status, data } = result;
    if (cookieValue) {
      const { token, tokenName } = cookieValue;
      return res
        .cookie(tokenName, token, authCookieConfig)
        .json({ message, success, timestamp, data })
        .status(status);
    }
    return res.status(status).json({ message, timestamp, success, data });
  }
  /**
   *
   * @param role
   * @param req
   * @param res
   * @returns
   */
  @Get('me')
  async auth(
    @Req()
    req: Request,
    @Res() res: Response,
  ) {
    //handle
    const result = await this.authService.clientAuth(req);
    const { message, status, success, data, timestamp, sessionId } = result;
    if (sessionId) {
      return res
        .cookie('session_id', sessionId, authCookieConfig)
        .status(status)
        .json({ message, success, timestamp, data });
    }
    return res.status(status).json({ message, success, timestamp, data });
  }
  /**
   * @param role
   * @param Res
   * @param req
   * @returns
   */
  @Post('logout')
  logout(
    @Req()
    req: {
      cookies: { access_token: string };
    },
    @Res() res: Response,
  ) {
    const tokenName = 'access_token';
    const token = req.cookies.access_token;
    if (!token)
      return res.status(401).json({
        message: 'Not existing your token in cookies!',
        success: false,
        timestamp: new Date(),
      });
    return res.status(200).clearCookie(tokenName).json({
      message: 'Logout is successfully!',
      success: true,
      timestamp: new Date(),
    });
  }
  /**
   * register
   */
  @Post('register/user')
  async userRegister(
    @Body() dto: RegisterUserAccountRequestDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.userRegister(dto);
    const { message, status, timestamp, success } = result;
    return res.status(status).json({ message, success, timestamp });
  }
}

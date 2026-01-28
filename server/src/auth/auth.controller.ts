import {
  Body,
  Controller,
  Get,
  Param,
  //   InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { LoginDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';
import { authCookieConfig } from 'src/config/cookie.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.clientLogin(dto);
    const { message, success, timestamp, cookieValue, status } = result;
    if (cookieValue) {
      const { token, tokenName } = cookieValue;
      return res
        .cookie(tokenName, token, authCookieConfig)
        .json({ message, success, timestamp })
        .status(status);
    }
    return res.status(status).json({ message, timestamp, success });
  }
  /**
   *
   * @param role
   * @param req
   * @param res
   * @returns
   */
  @Get('me/:role')
  async auth(
    @Param('role') role: 'user' | 'seller',
    @Req()
    req: {
      cookies: { seller_access_token: string; user_access_token: string };
    },
    @Res() res: Response,
  ) {
    const token: string =
      role === 'seller'
        ? req.cookies.seller_access_token
        : req.cookies.user_access_token;
    const result = await this.authService.clientAuth(token);
    const { message, status, success, data, timestamp } = result;
    if (data) {
      return res.status(status).json({ message, success, data, timestamp });
    }
    return res.status(status).json({ message, success, timestamp });
  }
  /**
   *
   * @param role
   * @param res
   * @returns
   */
  @Get('profile/:role')
  async profile(
    @Param('role') role: 'user' | 'seller',
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { message, status, success, data } =
      await this.authService.getProfile(role, req);
    return res.status(status).json({ message, success, data });
  }
  /**
   * @param role
   * @param Res
   * @param req
   * @returns
   */
  @Post('logout')
  logout(
    @Body('role') role: 'user' | 'seller',
    @Req()
    req: {
      cookies: { seller_access_token: string; user_access_token: string };
    },
    @Res() res: Response,
  ) {
    const tokenName = role + '_access_token';
    const token =
      role === 'seller'
        ? req.cookies.seller_access_token
        : req.cookies.user_access_token;
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
}

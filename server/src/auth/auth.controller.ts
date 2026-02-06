import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { authCookieConfig } from 'src/config/cookie.config';
import {
  LoginRequestDto,
  RegisterUserAccountRequestDto,
} from 'src/dto/request/auth.request.dto';
import { RoleDto } from 'src/dto/common/auth.common.dto';
import { CookieMap } from 'src/interfaces/cookies.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (dto.loginRole === RoleDto.SELLER) {
      const result = await this.authService.sellerLogin(dto);
      const { token, data, message, success, timestamp } = result;
      res.cookie('access_token', token, authCookieConfig);
      return { message, success, timestamp, data };
    }
    const sessionId = req.sessionId;
    const result = await this.authService.clientLogin(dto, sessionId);
    const { token, data, message, success, timestamp } = result;
    console.log(result);
    res.cookie('access_token', token, authCookieConfig);
    return { message, success, timestamp, data };
  }
  /**
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
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookies = req.cookies as CookieMap;
    const access_token = cookies.access_token;
    const session_id = cookies.session_id;

    if (!access_token && !session_id)
      return res.status(401).json({
        message: 'Not existing your token in cookies!',
        success: false,
        timestamp: new Date(),
      });

    res.clearCookie('access_token', authCookieConfig);
    res.clearCookie('session_id', authCookieConfig);

    return res.status(200).json({
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

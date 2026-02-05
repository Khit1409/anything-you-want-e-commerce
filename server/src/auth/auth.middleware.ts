import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthenticationDataDto } from 'src/dto/response/auth.response.dto';
import { CookieMap } from 'src/interfaces/cookies.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: () => void) {
    const cookies = req.cookies as CookieMap;
    const accessToken = cookies.access_token;
    if (!accessToken) {
      return res.status(401).json({
        message: 'Token is not found, can be is not login or expire token!',
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
    const decoded: AuthenticationDataDto =
      await this.jwtService.verifyAsync(accessToken);
    if (!decoded) {
      return res.status(404).json({
        message: 'Verify is fail!',
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
    const uid = decoded.uid;
    req.userId = uid;
    next();
  }
}

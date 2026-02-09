import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Request } from 'express';

import bcrypt from 'node_modules/bcryptjs';

import { CookieMap } from 'src/interfaces/cookies.interface';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dto/auth.request.dto';
import { RoleDto } from '../common/dto/response.common.dto';
import {
  AuthenticationDataDto,
  AuthenticationResponseDto,
  LoginResponseDto,
} from './dto/auth.response.dto';
import { User } from '../users/entities/user.entity';
import { Seller } from '../sellers/entities/seller.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Seller) private readonly sellerRepo: Repository<Seller>,
    private jwtService: JwtService,
  ) {}
  /**
   * client login
   * @param dto
   * @returns
   */
  async clientLogin(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { emailAddress, currentPassword } = dto;

    try {
      const user = await this.userRepo.findOne({ where: { emailAddress } });
      if (!user) {
        throw new HttpException(
          {
            message: 'USER IS NOT DEFINE!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          401,
        );
      }

      const comparePassword = await bcrypt.compare(
        currentPassword,
        user.hashPassword,
      );

      if (!comparePassword) {
        throw new HttpException(
          {
            message: 'Password is not compare!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          300,
        );
      }

      const tokenPayload = {
        uid: user.id,
        role: 'user' as RoleDto,
        email: user.emailAddress,
      };

      const token = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '1d',
      });

      return {
        data: { role: tokenPayload.role },
        token,
        message: 'LOGIN SUCCESSFULLY!',
        success: true,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error as string,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        },
        500,
      );
    }
  }
  /**
   *
   * @param dto
   * @returns
   */
  async sellerLogin(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { loginRole, currentPassword, emailAddress } = dto;
    try {
      if (loginRole !== RoleDto.SELLER) {
        throw new HttpException(
          {
            message: 'Role is not seller!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          400,
        );
      }
      const seller = await this.sellerRepo.findOne({ where: { emailAddress } });

      if (!seller) {
        throw new HttpException(
          {
            message: 'seller IS NOT DEFINE!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          401,
        );
      }
      const comparePassword = await bcrypt.compare(
        currentPassword,
        seller.hashPassword,
      );

      if (!comparePassword) {
        throw new HttpException(
          {
            message: 'Password is not compare!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          300,
        );
      }
      const tokenPayload = {
        uid: seller.id,
        role: 'seller' as RoleDto,
        email: seller.emailAddress,
      };

      const token = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '1d',
      });

      return {
        token,
        data: { role: tokenPayload.role },
        message: 'LOGIN SUCCESSFULLY!',
        success: true,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error as string,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        },
        500,
      );
    }
  }
  /**
   * authentication
   */
  async clientAuth(
    req: Request,
  ): Promise<AuthenticationResponseDto & { sessionId?: string }> {
    try {
      //token
      const cookies = req.cookies as CookieMap;
      const accessToken = cookies.access_token;
      if (!accessToken) {
        const sessionToken = cookies.session_id;
        if (!sessionToken) {
          const sessionId = randomUUID();
          return {
            message: 'Token is not found, can be is not login or expire token!',
            success: false,
            sessionId,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          };
        }
        throw new HttpException(
          {
            message: 'Token is not found, can be is not login or expire token!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          401,
        );
      }
      const decoded: AuthenticationDataDto =
        await this.jwtService.verifyAsync(accessToken);
      if (!decoded) {
        throw new HttpException(
          {
            message: "can't verify token!",
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          404,
        );
      }
      return {
        message: 'Verify is successfully!',
        success: true,
        data: decoded,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error as string,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        },
        500,
      );
    }
  }
  /**
   *
   */
  async getProfile(userId: string) {
    try {
      const user = await this.userRepo.findOne({
        where: { id: userId },
        select: ['id', 'emailAddress', 'status', 'lastLoginAt'],
        relations: ['info', 'addresses', 'phones'],
      });
      if (!user) {
        throw new UnauthorizedException({
          message: 'user profile is not found',
          success: false,
          data: { user },
          timestamp: new Date().toLocaleDateString('vi-VN'),
        });
      }
      return {
        message: 'User profile is ready using!',
        success: true,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: error as string,
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
  }
}

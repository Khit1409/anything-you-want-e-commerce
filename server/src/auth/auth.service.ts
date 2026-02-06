import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { Model } from 'mongoose';
import bcrypt from 'node_modules/bcryptjs';
import { Seller } from 'src/database/structure/entities/seller.entity';
import { User, UserStatus } from 'src/database/structure/entities/user.entity';
import { UserAddress } from 'src/database/structure/entities/userAdress.entity';
import { UserInfo } from 'src/database/structure/entities/userInfo.entity';
import { UserPhone } from 'src/database/structure/entities/userPhone.entity';
import { Cart } from 'src/database/structure/schemas/cart.schema';
import { RoleDto } from 'src/dto/common/auth.common.dto';

import { ResponseDto } from 'src/dto/common/response.common.dto';
import {
  LoginRequestDto,
  RegisterUserAccountRequestDto,
} from 'src/dto/request/auth.request.dto';
import {
  AuthenticationDataDto,
  AuthenticationResponseDto,
  LoginResponseDto,
} from 'src/dto/response/auth.response.dto';
import { CookieMap } from 'src/interfaces/cookies.interface';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Seller) private readonly sellerRepo: Repository<Seller>,
    @InjectRepository(UserPhone)
    private readonly userPhoneRepo: Repository<UserPhone>,
    @InjectRepository(UserAddress)
    private readonly userAddresRepo: Repository<UserAddress>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepo: Repository<UserInfo>,
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    private jwtService: JwtService,
  ) {}
  /**
   * user register
   */
  async userRegister(
    dto: RegisterUserAccountRequestDto,
  ): Promise<ResponseDto & { status: number }> {
    try {
      const {
        address,
        currentPassword,
        dateOfBirth,
        emailAddress,
        firstName,
        lastName,
        fullName,
        phones,
      } = dto;

      const existing = await this.userRepo.findOne({ where: { emailAddress } });

      if (existing) {
        return {
          success: false,
          message: 'EXISTING USER EMAIL!',
          timestamp: new Date().toLocaleDateString('vi-VN'),
          status: 302,
        };
      }

      const hashPassword = await bcrypt.hash(currentPassword, 10);

      const newUser = this.userRepo.create({
        emailAddress,
        hashPassword,
        status: UserStatus.ACTIVE,

        info: {
          dateOfBirth: new Date(dateOfBirth),
          firstName,
          lastName,
          fullName,
        },

        addresses: address.map((a) => ({
          province: a.province,
          ward: a.ward,
          addressDetail: a.addressDetail,
        })),

        phones: phones.map((p) => ({
          phoneNumber: p.phoneNumber,
        })),
      });

      const created = await this.userRepo.save(newUser);
      if (!created) {
        return {
          status: 404,
          message: 'REGISTER IS FAIL USER IS NOT SAVE!',
          timestamp: new Date().toLocaleDateString('vi-VN'),
          success: false,
        };
      }
      return {
        success: true,
        message: 'REGISTER SUCCESSFULLY!',
        status: 200,
        timestamp: new Date().toLocaleDateString(),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.message,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
          status: error.status || 500,
        };
      }
      return {
        message: 'Unknow error',
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
        status: 500,
      };
    }
  }
  /**
   * client login
   * @param dto
   * @returns
   */
  async clientLogin(
    dto: LoginRequestDto,
    sessionId?: string,
  ): Promise<LoginResponseDto> {
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

      if (sessionId) {
        try {
          /**-> user login -> find carts by session id -> update user id
           *-> user logout -> xóa user id và session id.
           *-> user thêm cart lần 2 (ssid tạo mới).
           *-> user login lần 2 -> find carts by session id -> update user id.
           */
          await this.cartModel.updateMany(
            { 'owner.session_id': sessionId },
            { 'owner.user_id': user.id },
          );
        } catch (error) {
          throw new HttpException(
            {
              message: (error as string) || 'Server error exception!',
              success: false,
              timestamp: new Date().toLocaleDateString('vi-VN'),
            },
            404,
          );
        }
      }

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
  ): Promise<
    AuthenticationResponseDto & { status: number; sessionId?: string }
  > {
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
            status: 401,
            success: false,
            sessionId,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          };
        }
        return {
          message: 'Token is not found, can be is not login or expire token!',
          status: 401,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        };
      }
      const decoded: AuthenticationDataDto =
        await this.jwtService.verifyAsync(accessToken);
      if (!decoded) {
        return {
          message: "can't verify token!",
          success: false,
          status: 404,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        };
      }
      return {
        message: 'Verify is successfully!',
        success: true,
        status: 200,
        data: decoded,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      return {
        message: error as string,
        success: false,
        status: 500,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    }
  }
}

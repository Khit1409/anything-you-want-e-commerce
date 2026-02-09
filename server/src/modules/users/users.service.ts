import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { RegisterUserAccountRequestDto } from '../auth/dto/auth.request.dto';
@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}
  /**
   *
   * @param dto
   * @returns
   */
  async register(dto: RegisterUserAccountRequestDto) {
    try {
      const existing = await this.repo.findByEmail(dto.emailAddress);

      if (existing) {
        throw new BadRequestException({
          success: false,
          message: 'EXISTING USER EMAIL!',
          timestamp: new Date().toLocaleDateString('vi-VN'),
        });
      }

      const created = await this.repo.create(dto);

      if (!created) {
        throw new HttpException(
          {
            message: 'REGISTER IS FAIL USER IS NOT SAVE!',
            timestamp: new Date().toLocaleDateString('vi-VN'),
            success: false,
          },
          404,
        );
      }
      return {
        success: true,
        message: 'REGISTER SUCCESSFULLY!',
        timestamp: new Date().toLocaleDateString(),
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: error as string,
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
  }
  /**
   *
   * @param id
   * @returns
   */
  async getInfo(id: string) {
    try {
      const info = await this.repo.getInfo(id);
      return {
        success: true,
        message: 'User info is reading using!',
        data: { info },
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error as string,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
  }
}

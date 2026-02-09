import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { UserService } from './users.service';
import { RegisterUserAccountRequestDto } from '../auth/dto/auth.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @HttpCode(201)
  @Post('register')
  async register(@Body() dto: RegisterUserAccountRequestDto) {
    return await this.service.register(dto);
  }
}

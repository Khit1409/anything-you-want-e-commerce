import { DatabaseModule } from '@/src/database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { UserPhone } from './entities/user-phone.entity';
import { UserInfo } from './entities/user-info.entity';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, UserInfo, UserPhone, UserAddress]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/modules/common/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/structure/entities/user.entity';
import { UserInfo } from 'src/database/structure/entities/userInfo.entity';
import { UserPhone } from 'src/database/structure/entities/userPhone.entity';
import { UserAddress } from 'src/database/structure/entities/userAdress.entity';
import { SellerPhone } from 'src/database/structure/entities/sellerPhone.entity';
import { Seller } from 'src/database/structure/entities/seller.entity';
import { SellerAddress } from 'src/database/structure/entities/sellerAddress.entity';
import { SellerInfo } from 'src/database/structure/entities/sellerInfo.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from 'src/database/structure/schemas/cart.schema';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<StringValue>('JWT_EXPIRES_IN') ?? '1d',
          algorithm: 'HS256',
        },
      }),
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      User,
      UserInfo,
      UserPhone,
      UserAddress,
      SellerPhone,
      Seller,
      SellerAddress,
      SellerInfo,
    ]),
    MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}

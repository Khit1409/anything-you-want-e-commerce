import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { SellerRepository } from './sellers.repository';
import { SellerController } from './sellers.controller';
import { SellerService } from './sellers.service';
import { DatabaseModule } from '@/src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from '../products/schemas/products.schema';
import { categorySchema } from '../categories/schemas/categories.schema';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Seller]),
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  controllers: [SellerController],
  providers: [SellerRepository, SellerService],
})
export class SellerModule {}

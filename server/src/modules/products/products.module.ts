import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { DatabaseModule } from '@/src/database/database.module';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schemas/products.schema';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from './products.repository';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, HttpResponse, ProductRepository],
})
export class ProductModule {}

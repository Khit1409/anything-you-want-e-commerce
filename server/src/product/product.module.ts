import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/database/structure/schemas/product.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

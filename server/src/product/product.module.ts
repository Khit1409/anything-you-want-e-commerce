import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductService } from './product.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

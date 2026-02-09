import { Module } from '@nestjs/common';
import { CategoryService } from '../categories/categories.service';
import { CategoryController } from '../categories/categories.controller';
import { DatabaseModule } from '@/src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './schemas/categories.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

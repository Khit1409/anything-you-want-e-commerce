import { Module } from '@nestjs/common';
import { CategoryService } from '../categories/categories.service';
import { CategoryController } from '../categories/categories.controller';
import { DatabaseModule } from '@/src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './schemas/categories.schema';
import { CategoryRepository } from './categories.repository';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}

import { Module } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CategoryController } from '../category/category.controller';
import { DatabaseModule } from 'src/modules/common/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from 'src/database/structure/schemas/category.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

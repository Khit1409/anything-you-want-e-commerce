import { Controller, Post } from '@nestjs/common';
import { CategoryService } from './categories.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('test')
  async test() {
    return await this.categoryService.test();
  }
}

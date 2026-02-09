import { Controller, Get, Query, Param, HttpCode } from '@nestjs/common';
import { ProductService } from './products.service';
import { GetProductQueryDto } from './dto/products.request.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(200)
  @Get()
  async getAll(@Query() dto: GetProductQueryDto) {
    return await this.productService.getAllProduct(dto);
  }
  @HttpCode(200)
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return await this.productService.getDetail(id);
  }
}

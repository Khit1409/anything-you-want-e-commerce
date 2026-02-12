import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProductQueryDto } from './dto/products.request.dto';
import { HttpResponse } from '@/src/helpers/httpResponse';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly repo: ProductRepository,
    private readonly httpHelper: HttpResponse,
  ) {}
  /**
   *  get 30 product for view page
   * @param query
   * @returns
   */
  async getAllProduct(query: GetProductQueryDto) {
    const limit = query.limit ?? 30;
    const page = query.page ?? 1;
    const skip = page * limit - limit;
    const select = 'info tags rating_sumary shipping brand images';
    const products = await this.repo.getPreview(skip, limit, select);
    const data = { products };
    return this.httpHelper.success('Products api is ready using!', data);
  }

  async getDetail(id: string) {
    const product = await this.repo.getDetail(id);

    if (!product) {
      throw new NotFoundException('product not found');
    }

    const categorySlug = product.info.category.slug;
    const related = await this.repo.getRelated(categorySlug, product.id);
    const data = {
      product,
      related,
    };
    return {
      ...this.httpHelper.success('Product api is ready using!'),
      data,
    };
  }
}

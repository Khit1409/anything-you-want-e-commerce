import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/database/structure/schemas/product.schema';
import { plainToInstance } from 'class-transformer';
import { GetProductQueryDto } from './dto/product.request.dto';
import {
  ProductDetailResponseDto,
  ProductRelatedReponseDto,
  ProductReponseDto,
} from './dto/product.response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}
  /**
   *  get 30 product for view page
   * @param query
   * @returns
   */
  async getAllProduct(query: GetProductQueryDto) {
    try {
      console.table([{ page: query.page ?? 1, type: 'query' }]);
      const limit = query.limit ?? 30;
      const page = query.page ?? 1;
      const skip = page * limit - limit;
      const products = await this.productModel
        .find()
        .select('info tags rating_sumary shipping brand images')
        .limit(limit)
        .skip(skip)
        .lean<Array<ProductReponseDto>>();
      return {
        message: 'PRODUCT API IS READY USING!',
        success: true,
        data: {
          products: plainToInstance(ProductReponseDto, products, {
            excludeExtraneousValues: true,
          }),
        },
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: error as string,
        success: false,
        data: { products: [] },
        timestamp: new Date().toLocaleDateString('vi-VN'),
      });
    }
  }

  async getDetail(id: string) {
    try {
      console.table([{ id }]);
      const productApi = await this.productModel.findById(id).lean();

      if (!productApi) {
        throw new HttpException(
          {
            success: false,
            message: 'PRODUCT NOT FOUND!',
            timestamp: new Date().toISOString(),
            data: { product: null, related: [] },
          },
          401,
        );
      }

      const categorySlug = productApi.info.category.slug;
      const relatedApi = await this.productModel
        .find({
          'info.category.slug': categorySlug,
          _id: { $ne: productApi._id },
        })
        .lean<Array<ProductReponseDto>>();

      return {
        message: 'Product api is ready using!',
        success: true,
        data: {
          product: plainToInstance(ProductDetailResponseDto, productApi, {
            excludeExtraneousValues: true,
          }),
          related: plainToInstance(ProductRelatedReponseDto, relatedApi, {
            excludeExtraneousValues: true,
          }),
        },
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Unknow error!',
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
        data: { product: null, related: [] },
      });
    }
  }
}

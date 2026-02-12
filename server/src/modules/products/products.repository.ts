import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from './schemas/products.schema';
import {
  ProductDetailResponseDto,
  ProductResponseDto,
} from './dto/products.response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async getById(id: string) {
    return await this.productModel.findById(id);
  }
  /**
   *
   * @param skip
   * @param limit
   * @param select
   * @returns
   */
  async getPreview(skip: number, limit: number, select: string) {
    const products = await this.productModel
      .find()
      .select(select)
      .skip(skip)
      .limit(limit)
      .lean();
    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }
  /**
   *
   * @param id
   * @returns
   */
  async getDetail(id: string) {
    const product = await this.productModel.findById(id).lean();
    return plainToInstance(ProductDetailResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }
  /**
   *
   * @param category
   * @param neId
   * @returns
   */
  async getRelated(category: string, neId: string) {
    const mongooId = new mongoose.Types.ObjectId(neId);
    const products = await this.productModel.find({
      'info.category.slug': category,
      _id: { $ne: mongooId },
    });

    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }
}

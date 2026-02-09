import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/categories.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async getAll() {
    return this.categoryModel.find().lean();
  }

  async test() {
    const fakeData = [
      {
        name: 'Fashion',
        slug: 'fashion',
      },
      {
        name: 'Shoes',
        slug: 'shoes',
      },
      {
        name: 'Electronics',
        slug: 'electronics',
      },
      {
        name: 'Beauty',
        slug: 'beauty',
      },
      {
        name: 'Home & Living',
        slug: 'home-living',
      },
      {
        name: 'Sports',
        slug: 'sports',
      },
      {
        name: 'Studies',
        slug: 'studies',
      },
      {
        name: 'Toys',
        slug: 'toys',
      },
    ];
    await this.categoryModel.create(fakeData);
  }
}

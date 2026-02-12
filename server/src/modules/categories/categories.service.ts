import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async getAll() {
    return await this.repository.getAll();
  }
}

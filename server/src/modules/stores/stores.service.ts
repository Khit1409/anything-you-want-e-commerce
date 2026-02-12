import { Injectable } from '@nestjs/common';
import { StoreRepository } from './stores.repository';

@Injectable()
export class StoreService {
  constructor(private readonly repository: StoreRepository) {}
}

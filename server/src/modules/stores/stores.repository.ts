import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Store) private readonly ormRepo: Repository<Store>,
  ) {}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellerRepository {
  constructor(
    @InjectRepository(Seller) private readonly ormRepo: Repository<Seller>,
  ) {}

  /**
   *
   * @param emailAddress
   * @returns
   */
  async finByEmail(emailAddress: string) {
    return await this.ormRepo.findOne({ where: { emailAddress } });
  }
}

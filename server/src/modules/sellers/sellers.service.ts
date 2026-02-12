import { Injectable } from '@nestjs/common';
import { SellerRepository } from './sellers.repository';

@Injectable()
export class SellerService {
  constructor(private readonly sellerRepository: SellerRepository) {}
}

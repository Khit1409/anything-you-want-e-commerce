import { Controller } from '@nestjs/common';
import { SellerService } from './sellers.service';

@Controller('sellers')
export class SellerController {
  constructor(private readonly service: SellerService) {}
}

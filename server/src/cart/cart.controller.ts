import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartRequestDto } from 'src/dto/request/cart.request.dto';
import type { Request, Response } from 'express';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(
    @Req() req: Request,
    @Body() dto: CartRequestDto,
    @Res() res: Response,
  ) {
    const result = await this.cartService.addToCart(dto, req);
    const { message, status, success, timestamp } = result;
    return res.status(status).json({ message, success, timestamp });
  }
}

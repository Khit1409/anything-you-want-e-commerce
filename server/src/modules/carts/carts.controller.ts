import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { CartService } from './carts.service';
import { CartRequestDto } from './dto/carts.request.dto';
import type { Request } from 'express';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @HttpCode(200)
  @Get()
  async getCart(@Req() req: Request) {
    const uid = req.userId;
    return await this.cartService.getCart(uid);
  }
  /**
   *
   * @param req
   * @param dto
   * @param res
   * @returns
   */
  @HttpCode(201)
  @Post()
  async addToCart(@Req() req: Request, @Body() dto: CartRequestDto) {
    return await this.cartService.addToCart(dto, req);
  }
}

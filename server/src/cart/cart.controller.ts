import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartRequestDto } from 'src/dto/request/cart.request.dto';
import type { Request, Response } from 'express';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @HttpCode(200)
  @Get()
  async getCart(@Req() req: Request) {
    const uid = req.userId;
    const sessionId = req.sessionId;
    return await this.cartService.getCart(uid, sessionId);
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

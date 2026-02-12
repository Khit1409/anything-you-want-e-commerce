import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Delete,
  Post,
  Put,
  Req,
  Param,
} from '@nestjs/common';
import { CartService } from './carts.service';
import {
  CartRequestDto,
  CartUpdateDataRequestDto,
} from './dto/carts.request.dto';
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
    const uid = req.userId;
    return await this.cartService.addToCart(dto, uid);
  }
  /**
   *
   */
  @HttpCode(HttpStatus.CREATED)
  @Put()
  async updateCart(@Body() dto: CartUpdateDataRequestDto, @Req() req: Request) {
    const uid = req.userId;
    return await this.cartService.updateCart(dto, uid);
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteCart(@Param('id') id: string, @Req() req: Request) {
    const uid = req.userId;
    return await this.cartService.deleteCart(id, uid);
  }
}

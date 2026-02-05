import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Cart } from 'src/database/structure/schemas/cart.schema';
import { Product } from 'src/database/structure/schemas/product.schema';
import { ResponseDto } from 'src/dto/common/response.common.dto';
import { CartRequestDto } from 'src/dto/request/cart.request.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async addToCart(
    dto: CartRequestDto,
    req: Request,
  ): Promise<ResponseDto & { status: number }> {
    try {
      const uid = req.userId ?? null;
      const sessionId = req.sessionId ?? null;

      const product = await this.productModel.findById(dto.items.product_id);
      console.log(product);
      if (!product) {
        return {
          message: 'This product is not define can be delete by seller!',
          status: 401,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        };
      }
      const ownerOfProduct = product.owner;
      const cartData = {
        owner: {
          seller_id: ownerOfProduct.seller_id,
          user_id: uid,
          store_id: ownerOfProduct.store_id,
          session_id: sessionId,
        },
        items: dto.items,
        options: dto.options,
        other_variants: dto.other_variants,
        rating_sumary: dto.rating_sumary,
        shipping: dto.shipping,
        variant_chosen: dto.variant_chosen,
      };
      const newCart = await this.cartModel.create(cartData);
      if (!newCart) {
        return {
          message: 'Cart is cannot to created!',
          status: 401,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        };
      }
      return {
        message: 'Create cart is successfully!',
        status: 200,
        success: true,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      return {
        message: error as string,
        status: 500,
        success: false,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    }
  }
}

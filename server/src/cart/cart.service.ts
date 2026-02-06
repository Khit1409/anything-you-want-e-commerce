import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import mongoose, { Connection, Model } from 'mongoose';
import { Cart } from 'src/database/structure/schemas/cart.schema';
import { Product } from 'src/database/structure/schemas/product.schema';
import { ResponseDto } from 'src/dto/common/response.common.dto';
import { CartRequestDto } from 'src/dto/request/cart.request.dto';
import { CartResponseDto } from 'src/dto/response/cart.response.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectConnection() private readonly cartConnection: Connection,
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  /**
   *
   */
  async getCartByProductId(productId: string) {
    try {
      const cart = await this.cartModel.findOne({
        'items.product_id': productId,
      });
      return cart;
    } catch (error) {
      throw new HttpException(
        {
          message: error as string,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        },
        404,
      );
    }
  }
  /**
   *
   * @param cartId
   * @param quantity
   */
  async updateCartProductIdExisting(cartId: string, quantity: number) {
    const cartSession = await this.cartConnection.startSession();
    cartSession.startTransaction();
    try {
      await this.cartModel.updateOne(
        {
          _id: new mongoose.Types.ObjectId(cartId),
        },
        {
          $inc: {
            'items.quantity': quantity,
          },
        },
      );
      await cartSession.commitTransaction();
    } catch (error) {
      await cartSession.abortTransaction();
      throw new HttpException(
        {
          message: error as string,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        },
        404,
      );
    } finally {
      await cartSession.endSession();
    }
  }
  /**
   *
   * @param dto
   * @param req
   * @returns
   */
  async addToCart(dto: CartRequestDto, req: Request) {
    const cartSession = await this.cartConnection.startSession();
    const uid = req.userId ?? null;
    const sessionId = req.sessionId ?? null;

    try {
      cartSession.startTransaction();
      const product = await this.productModel.findById(dto.items.product_id);
      if (!product) {
        throw new HttpException(
          {
            message: 'This product is not define can be delete by seller!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          401,
        );
      }
      const existing = await this.getCartByProductId(dto.items.product_id);
      if (existing) {
        await this.updateCartProductIdExisting(
          existing._id.toString(),
          dto.items.quantity,
        );
        return {
          message: 'Create cart is successfully!',
          success: true,
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
        throw new HttpException(
          {
            message: 'Cart is cannot to created!',
            success: false,
            timestamp: new Date().toLocaleDateString('vi-VN'),
          },
          404,
        );
      }
      await cartSession.commitTransaction();
      return {
        message: 'Create cart is successfully!',
        success: true,
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      await cartSession.abortTransaction();
      throw new HttpException(
        {
          message: error as string,
          success: false,
          timestamp: new Date().toLocaleDateString('vi-VN'),
        },
        404,
      );
    } finally {
      await cartSession.endSession();
    }
  }
  /**
   *
   * @param userId
   */
  async getCart(
    userId?: string,
    sessionId?: string,
  ): Promise<
    ResponseDto & {
      data: { carts: Array<CartResponseDto> | Array<never> };
    }
  > {
    if (!userId && !sessionId) {
      throw new HttpException(
        {
          message: 'User is and session id not found!',
          success: false,
          timestamp: new Date().toLocaleDateString('vi-vn'),
          data: { carts: [] },
        },
        401,
      );
    }
    try {
      let query = {};
      if (userId) query = { 'owner.user_id': userId };
      else {
        query = {
          'owner.session_id': sessionId,
        };
      }
      const carts = await this.cartModel
        .find(query)
        .select('-owner -__v')
        .lean();
      return {
        message:
          carts.length == 0
            ? 'carts response but empty!'
            : 'carts api data is ready using!',
        success: true,
        data: {
          carts: plainToInstance(CartResponseDto, carts, {
            excludeExtraneousValues: true,
          }),
        },
        timestamp: new Date().toLocaleDateString('vi-VN'),
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'server error: ' + ((error as string) ?? ''),
          success: true,
          data: { carts: [] },
          timestamp: new Date().toLocaleDateString('vi-VN'),
        },
        500,
      );
    }
  }
}

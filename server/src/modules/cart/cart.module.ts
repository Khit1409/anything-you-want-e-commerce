import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/modules/common/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from 'src/database/structure/schemas/cart.schema';
import { productSchema } from 'src/database/structure/schemas/product.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: 'Cart', schema: cartSchema },
      { name: 'Product', schema: productSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

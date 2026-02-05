import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

export class CartCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;
}

export class CartItem {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: CartCategory, required: true })
  category: CartCategory;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  origin_price: number;

  @Prop({ required: true })
  total_price: number;

  @Prop({ required: true })
  product_id: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, min: 0, max: 100 })
  sale: number;

  @Prop({ required: true })
  thumbnail: string;
}

export class CartOptionValue {
  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  display: string;

  @Prop()
  image?: string;
}

export class CartOption {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  label: string;

  @Prop({ type: [CartOptionValue], default: [] })
  values: CartOptionValue[];
}

export class CartVariant {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: Object, required: true })
  options: Record<string, string>;

  @Prop({ required: true })
  price_extra: number;
}

export class CartRatingSumary {
  @Prop({ required: true })
  avg: number;

  @Prop({ required: true })
  total: number;
}

export class CartShipping {
  @Prop({ required: true })
  flash: boolean;

  @Prop({ required: true })
  normal: boolean;
}

export class CartOwner {
  @Prop({ type: String, required: true, default: null })
  user_id: string | null;
  @Prop({ type: String, required: true })
  seller_id: string;
  @Prop({ type: String, required: true })
  store_id: string;
  @Prop({ type: String, required: true, default: null })
  session_id: string | null;
}

@Schema({ timestamps: true, collection: 'carts' })
export class Cart {
  @Prop({ type: CartItem, required: true })
  items: CartItem;
  @Prop({ type: CartOwner, required: true })
  owner: CartOwner;
  @Prop({ type: [CartOption], default: [] })
  options: CartOption[];
  @Prop({ type: [CartVariant], default: [] })
  other_variants: CartVariant[];
  @Prop({ type: CartRatingSumary, required: true })
  rating_sumary: CartRatingSumary;
  @Prop({ type: CartShipping, required: true })
  shipping: CartShipping;
  @Prop({ type: CartVariant, required: true })
  variant_chosen: CartVariant;
}

export const cartSchema = SchemaFactory.createForClass(Cart);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class ProductCategory {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  slug: string;
}
export class ProductInfo {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: Number, min: 1, required: true })
  price: number;
  @Prop({ type: Number, min: 0, max: 100, default: 0, required: true })
  sale: number;
  @Prop({ type: String, default: 'Không', required: true })
  brand: string;
  @Prop({ type: String, required: true })
  origin: string;
  @Prop({ type: ProductCategory, required: true })
  category: ProductCategory;
}
export class ProductOwnerInfo {
  @Prop({ type: String, required: true })
  seller_id: string;
  @Prop({ type: String, required: true })
  store_id: string;
}
export class ProductImage {
  @Prop({ type: String, required: true })
  thumbnail: string;
  @Prop({ type: [String], required: true })
  details: string[];
}
export class ProductOptionValue {
  @Prop({ type: String, required: true })
  value: string;
  @Prop({ type: String, required: true })
  display: string;
  @Prop({ type: String, required: false })
  image?: string;
}
export class ProductOption {
  @Prop({ type: String, required: true })
  key: string;
  @Prop({ type: String, required: true })
  label: string;
  @Prop({ type: [ProductOptionValue] })
  values: ProductOptionValue[];
}
export class ProductVariant {
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({ type: Number, required: true, min: 1 })
  stock: number;
  @Prop({ type: Map, of: String, required: true })
  options: Map<string, string>;
  @Prop({ type: Number, required: false, default: 0 })
  price_extra: number;
}
export class ProductShipping {
  @Prop({ type: Boolean, required: true, default: false })
  flash: boolean;
  @Prop({ type: Boolean, required: true, default: true })
  normal: boolean;
}
export class ProductRating {
  @Prop({ type: Number, required: true, default: 5, min: 1, max: 5 })
  avg: number;
  @Prop({ type: Number, required: true, default: 0 })
  total: number;
}
export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ZERO = 'zero',
}
export class ProductReview {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  comment: string;
  @Prop({ type: Date, required: true })
  comment_at: Date;
  @Prop({ type: Number, max: 5, min: 1, required: true })
  rating: number;
  @Prop({ type: [String], required: false, default: [] })
  imgs: string[];
}

@Schema({ collection: 'products', timestamps: true, _id: true })
export class Product {
  @Prop({ type: ProductInfo, _id: false, required: true })
  info: ProductInfo;
  @Prop({ type: [String], _id: false, required: true })
  tags: string[];
  @Prop({ type: ProductOwnerInfo, _id: false, required: true })
  owner: ProductOwnerInfo;
  @Prop({ type: ProductImage, required: true, _id: false })
  images: ProductImage;
  @Prop({ required: true, type: [ProductOption], _id: false })
  options: ProductOption[];
  @Prop({ type: [ProductVariant], required: true, _id: false })
  variants: ProductVariant[];
  @Prop({ type: ProductShipping, required: true, _id: false })
  shipping: ProductShipping;
  @Prop({ required: true, type: ProductRating })
  rating_sumary: ProductRating;
  @Prop({
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.ACTIVE,
    required: true,
  })
  status: ProductStatus;
  @Prop({ type: [ProductReview], required: false, default: [] })
  reviews: ProductReview[];
}

export const productSchema = SchemaFactory.createForClass(Product);

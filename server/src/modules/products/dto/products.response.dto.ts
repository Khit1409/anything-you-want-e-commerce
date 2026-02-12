import { Expose, Transform, Type } from 'class-transformer';
import { ResponseDto } from '../../common/dto/response.common.dto';
import mongoose from 'mongoose';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ZERO = 'zero',
}
export class ProductCategoryDto {
  @Expose({ name: 'name' })
  name: string;
  @Expose({ name: 'slug' })
  slug: string;
}
export class ProductInfoResponseDto {
  @Expose({ name: 'name' })
  name: string;
  @Expose({ name: 'price' })
  price: number;
  @Expose({ name: 'sale' })
  sale: number;
  @Expose({ name: 'category' })
  @Type(() => ProductCategoryDto)
  category: ProductCategoryDto;
  @Expose({ name: 'description' })
  description: string;
  @Expose()
  brand: string;
  @Expose()
  origin: string;
}

export class ProductImageResponseDto {
  @Expose()
  thumbnail: string;
  @Expose()
  @Type(() => String)
  details: Array<string>;
}

export class ProductApi extends ResponseDto {
  data: { products: Array<ProductResponseDto> };
}

export class ProductOwnerReponseDto {
  @Expose({ name: 'seller_id' })
  sellerId: string;
  @Expose({ name: 'store_id' })
  storeId: string;
}

export class ProductOptionValueResponseDto {
  @Expose()
  value: string;
  @Expose()
  display: string;
  @Expose()
  image?: string;
}
export class ProductOptionResponseDto {
  @Expose()
  key: string;
  @Expose()
  label: string;
  @Expose()
  @Type(() => ProductOptionValueResponseDto)
  values: Array<ProductOptionValueResponseDto>;
}

export class ProductVariantReponseDto {
  @Expose({ name: 'sku' })
  sku: string;
  @Expose({ name: 'stock' })
  stock: number;
  @Expose()
  options: Map<string, string>;
  @Expose({ name: 'price_extra' })
  priceExtra: number;
}
export class ProductRatingResponseDto {
  @Expose()
  avg: number;
  @Expose()
  total: number;
}
export class ProductShippingResponseDto {
  @Expose()
  flash: boolean;
  @Expose()
  normal: boolean;
}
export class ProductReviewResponseDto {
  @Expose()
  rating: number;
  @Expose()
  comment: string;
  @Expose()
  name: string;
  @Expose()
  @Type(() => String)
  imgs: Array<string>;
  @Expose()
  email: string;
  @Expose({ name: 'comment_at' })
  commentAt: Date | string;
}

export class ProductResponseDto {
  @Expose({ name: '_id' })
  @Transform(({ obj }: { obj: { _id: mongoose.Types.ObjectId } }) =>
    obj._id.toString(),
  )
  id: string;
  @Expose({ name: 'info' })
  @Type(() => ProductInfoResponseDto)
  info: ProductInfoResponseDto;
  @Expose({ name: 'tags' })
  tags: Array<string>;
  @Expose({ name: 'rating_sumary' })
  ratingSumary: ProductRatingResponseDto;
  @Expose()
  shipping: ProductShippingResponseDto;
  @Expose({ name: 'images' })
  @Type(() => ProductImageResponseDto)
  images: ProductImageResponseDto;
  @Expose()
  status: ProductStatus;
}

export class ProductRelatedReponseDto extends ProductResponseDto {
  readonly;
}

export class ProductDetailResponseDto extends ProductResponseDto {
  @Expose()
  @Type(() => ProductOptionResponseDto)
  options: Array<ProductOptionResponseDto>;
  @Expose({ name: 'variants' })
  @Type(() => ProductVariantReponseDto)
  variants: Array<ProductVariantReponseDto>;
  @Expose({ name: 'reviews' })
  @Type(() => ProductReviewResponseDto)
  reviews: Array<ProductReviewResponseDto>;
  @Expose({ name: 'band' })
  brand: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

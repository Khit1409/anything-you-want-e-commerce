import { ApiResponse } from "../common/response";
import { GetProductPreviewRequest } from "../request/product.request";

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ZERO = "zero",
}

export interface ProductPreviewApiResponse extends ApiResponse {
  data: ProductPreviewDataResponse;
}

export interface ProductDetailApiResponse extends ApiResponse {
  data: ProductDetailDataApiResponse;
}

export interface ProductDetailDataApiResponse {
  product: ProductDetail | null;
  related: Array<ProductPreviews>;
}

export interface ProductPreviewDataResponse {
  products: Array<ProductPreviews>;
  request: GetProductPreviewRequest;
}
export interface ProductOptionValue {
  value: string;
  display: string;
  image?: string;
}

export interface ProductOption {
  key: string;
  label: string;
  values: Array<ProductOptionValue>;
}

export interface ProductShipping {
  flash: boolean;
  normal: boolean;
}

export interface ProductRating {
  avg: number;
  total: number;
}

export interface ProductPreviews {
  id: string;
  info: ProductInfo;
  tags: Array<string>;
  ratingSumary: ProductRating;
  shipping: ProductShipping;
  images: ProductImages;
  status: ProductStatus;
}

export interface ProductInfo {
  name: string;
  price: number;
  sale: number;
  category: ProductCategory;
  description: string;
  brand: string;
  origin: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ProductImages {
  thumbnail: string;
  details: Array<string>;
}

export interface ProductDetail extends ProductPreviews {
  variants: Array<ProductVariants>;
  options: Array<ProductOption>;
  reviews: Array<ProductReviews>;
}

export interface ProductVariantOption {
  [key: string]: string;
}

export interface ProductVariants {
  sku: string;
  stock: number;
  options: ProductVariantOption;
  priceExtra: number;
}

export interface ProductReviews {
  email: string;
  name: string;
  comment: string;
  commentAt: Date | string;
  rating: number; //max 5
  imgs: Array<string>;
}
/**
 * hidden if user
 */
export interface ProductOwner {
  sellerId: string;
  storeId: string;
}

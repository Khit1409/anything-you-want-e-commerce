export interface CartRequest {
  items: CartItemRequest;
  options: Array<CartOptionRequest>;
  variant_chosen: CartVariantChosenRequest;
  other_variants: Array<CartVariantChosenRequest>;
  shipping: CartShippingRequest;
  rating_sumary: CartRatingSumaryRequest;
}

export interface CartItemRequest {
  product_id: string;
  name: string;
  total_price: number;
  sale: number;
  origin_price: number;
  quantity: number;
  category: Category;
  brand: string;
  origin: string;
  thumbnail: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface CartOptionRequest {
  key: string;
  label: string;
  values: Array<CartOptionValueRequest>;
}

export interface CartOptionValueRequest {
  value: string;
  display: string;
  image?: string;
}

export interface CartVariantChosenRequest {
  sku: string;
  stock: number;
  options: { [key: string]: string };
  price_extra: number;
}

export interface CartVariantOptionRequest {
  color: string;
  size: string;
}

export interface CartShippingRequest {
  flash: boolean;
  normal: boolean;
}

export interface CartRatingSumaryRequest {
  avg: number;
  total: number;
}

export interface CartUpdateDataRequest {
  id: string;
  quantity?: number;
  variantOptionChosen?: { [key: string]: string };
}

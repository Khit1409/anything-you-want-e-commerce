import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CartCategoryRequestDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}

export class CartOptionValueRequestDto {
  @IsString()
  value: string;

  @IsString()
  display: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CartOptionRequestDto {
  @IsString()
  key: string;

  @IsString()
  label: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartOptionValueRequestDto)
  values: CartOptionValueRequestDto[];
}

export class CartVariantBaseDto {
  @IsString()
  sku: string;

  @IsInt()
  stock: number;

  @IsObject()
  options: Record<string, string>;

  @IsNumber()
  price_extra: number;
}

export class CartOtherVariantRequestDto extends CartVariantBaseDto {}

export class CartVariantChosenRequestDto extends CartVariantBaseDto {}

export class CartRatingSumaryRequestDto {
  @IsNumber()
  avg: number;

  @IsNumber()
  total: number;
}

export class CartShippingRequestDto {
  @IsBoolean()
  flash: boolean;

  @IsBoolean()
  normal: boolean;
}

export class CartItemRequestDto {
  @IsString()
  brand: string;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CartCategoryRequestDto)
  category: CartCategoryRequestDto;

  @IsString()
  origin: string;

  @IsNumber()
  origin_price: number;

  @IsNumber()
  total_price: number;

  @IsString()
  product_id: string;

  @IsInt()
  quantity: number;

  @IsInt()
  @Min(0)
  @Max(100)
  sale: number;

  @IsString()
  thumbnail: string;
}

export class CartRequestDto {
  @ValidateNested()
  @Type(() => CartItemRequestDto)
  items: CartItemRequestDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartOptionRequestDto)
  options: CartOptionRequestDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartOtherVariantRequestDto)
  other_variants: CartOtherVariantRequestDto[];

  @ValidateNested()
  @Type(() => CartRatingSumaryRequestDto)
  rating_sumary: CartRatingSumaryRequestDto;

  @ValidateNested()
  @Type(() => CartShippingRequestDto)
  shipping: CartShippingRequestDto;

  @ValidateNested()
  @Type(() => CartVariantChosenRequestDto)
  variant_chosen: CartVariantChosenRequestDto;
}

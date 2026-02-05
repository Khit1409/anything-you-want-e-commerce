import { CartRequest } from "@/interfaces/request/cart.request";
import {
  ProductDetail,
  ProductVariants,
} from "@/interfaces/response/product.response";

interface CartFormData {
  product: ProductDetail;
  quantity: number;
  final_price: number;
  variantChosen: ProductVariants;
}

export const handleValidateCartFormData = ({
  product,
  final_price,
  quantity,
  variantChosen,
}: CartFormData): CartRequest => {
  const { id, images, info, options, ratingSumary, shipping, variants } =
    product;

  const otherVariants = variants.filter(
    (variant) => variant.sku !== variantChosen.sku
  );

  return {
    items: {
      brand: info.brand,
      name: info.name,
      category: info.category,
      origin: info.origin,
      origin_price: final_price,
      total_price: final_price * quantity,
      product_id: id,
      quantity,
      sale: info.sale,
      thumbnail: images.thumbnail,
    },
    options: options,
    other_variants: otherVariants.map((newObj) => ({
      options: newObj.options,
      sku: newObj.sku,
      stock: newObj.stock,
      price_extra: newObj.priceExtra,
    })),
    rating_sumary: ratingSumary,
    shipping,
    variant_chosen: {
      options: variantChosen.options,
      sku: variantChosen.sku,
      stock: variantChosen.stock,
      price_extra: variantChosen.priceExtra,
    },
  };
};

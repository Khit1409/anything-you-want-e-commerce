"use client";

import { addToCartService } from "@/api/cart.api";
import { getProductDetailService } from "@/api/product.api";
import { handleValidateCartFormData } from "@/features/cart.feature";
import {
  ProductVariantOption,
  ProductVariants,
} from "@/interfaces/response/product.response";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useProductDetail() {
  const params: { id: string } = useParams();
  const id = params.id;
  /***
   * component state
   */
  const [optionsChosen, setOptionChosen] = useState<ProductVariantOption>({});
  const [variantChosen, setVariantChosen] = useState<ProductVariants>();
  const [quantity, setQuantity] = useState<number>(1);

  /**
   * react query (api)
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return getProductDetailService(id);
    },
    enabled: !!id,
  });
  const product = data?.product ?? null;
  const related = data?.related ?? [];
  /**
   * helper
   */
  const finalPrice = useCallback(
    (price: number, sale: number) => {
      let final = price - price * (sale / 100);
      if (variantChosen) final += variantChosen.priceExtra;
      return final;
    },
    [variantChosen]
  );

  const minusSale = (price: number, sale: number) => {
    const minusValue = price * (sale / 100);
    return minusValue;
  };
  /**
   *
   * @param options
   * @param variants
   * @returns
   */
  const variantMatching = (
    options: ProductVariantOption,
    variants: Array<ProductVariants>
  ) => {
    return variants.find((vari) => {
      const variantOptions = vari.options;
      const choseKeys = Object.keys(options);
      const variantOptionKeys = Object.keys(variantOptions);
      if (choseKeys.length !== variantOptionKeys.length) return false;
      return variantOptionKeys.every(
        (key) => options[key] === variantOptions[key]
      );
    });
  };
  /**
   * component onchange
   */
  const onchangeOption = ({ key, value }: { key: string; value: string }) => {
    setOptionChosen((prev) => {
      if (prev[key] && prev[key] === value) {
        const { [key]: _, ...rest } = prev;
        console.log("Just block warning not usefull!", _);
        return rest;
      }
      return { ...prev, [key]: value };
    });
  };
  /**
   * use effect hook
   */
  useEffect(() => {
    if (!product?.variants) return;
    const matched = variantMatching(optionsChosen, product.variants);
    setVariantChosen(matched);
  }, [optionsChosen, product?.variants]);

  useEffect(() => {
    if (optionsChosen && variantChosen) {
      if (quantity > variantChosen.stock) {
        setQuantity(variantChosen.stock);
      }
    }
  }, [optionsChosen, variantChosen, quantity]);
  /**
   * submit function
   */
  const addToCart = useCallback(async () => {
    if (!product) return;
    if (!variantChosen) return;
    const info = product.info;
    const final_price = finalPrice(info.price, info.sale);
    const formData = handleValidateCartFormData({
      product,
      final_price,
      quantity,
      variantChosen,
    });
    await addToCartService(formData);
  }, [product, quantity, variantChosen, finalPrice]);
  /**
   * result
   */
  return {
    product,
    related,
    error,
    isLoading,
    variantMatching,
    optionsChosen,
    setOptionChosen,
    onchangeOption,
    variantChosen,
    addToCart,
    quantity,
    setQuantity,
    finalPrice,
    minusSale,
  };
}

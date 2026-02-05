"use client";

import useProductDetail from "@/hooks/products/useProductDetail";
import ProductLoading from "../common/ProductLoading";
import NotFoundProduct from "../common/NotFoundProduct";
import ProductImage from "../products/ProductImage";
import ProductInformation from "../products/ProductInformation";
import ProductRelated from "../products/ProductRelated";
import ProductReview from "../products/ProductReview";
import ProductOptionSection from "../products/ProductOption";
import ProductAction from "../products/ProductAction";

export default function ProductDetailPage() {
  const {
    product,
    isLoading,
    error,
    related,
    onchangeOption,
    optionsChosen,
    quantity,
    setQuantity,
    addToCart,
    variantChosen,
    finalPrice,
    minusSale,
  } = useProductDetail();

  if (isLoading) return <ProductLoading />;
  if (!isLoading && !product) return <NotFoundProduct />;
  if (error) return <p>{error.message}</p>;

  return product ? (
    <div className="w-full p-4 bg-gray-50 mt-3">
      <div className="uppercase py-2 border-b border-gray-300">
        <h3>Thông tin sản phẩm</h3>
      </div>
      <div className="flex gap-4 bg-white">
        <div className="flex-1">
          <ProductImage images={product.images} />
          <ProductOptionSection
            options={product.options}
            optionsChosen={optionsChosen}
            onchangeOption={onchangeOption}
          />
          <ProductAction
            checkIsCorrectQuantity={variantChosen?.stock}
            addToCart={addToCart}
            options={optionsChosen}
            quantity={quantity}
            setQuantity={setQuantity}
            variants={product.variants}
          />
        </div>
        <ProductInformation
          product={product}
          variantChosen={variantChosen}
          finalPrice={finalPrice}
          minusSale={minusSale}
        />
      </div>
      <ProductReview reviews={product.reviews} />
      <ProductRelated products={related} />
    </div>
  ) : (
    <NotFoundProduct />
  );
}

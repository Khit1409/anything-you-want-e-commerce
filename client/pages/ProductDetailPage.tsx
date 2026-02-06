"use client";

import NotFoundProduct from "@/components/products/NotFoundProduct";
import SectionShowDataLoading from "@/components/common/SectionShowDataLoading";
import ProductAction from "@/components/products/ProductAction";
import ProductImage from "@/components/products/ProductImage";
import ProductInformation from "@/components/products/ProductInformation";
import ProductOptionSection from "@/components/products/ProductOption";
import ProductRelated from "@/components/products/ProductRelated";
import ProductReview from "@/components/products/ProductReview";
import useProductDetail from "@/hooks/products/useProductDetail";

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

  if (isLoading) return <SectionShowDataLoading />;
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
      {related.length > 0 && <ProductRelated products={related} />}
    </div>
  ) : (
    <NotFoundProduct />
  );
}

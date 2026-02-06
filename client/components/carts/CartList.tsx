import useCartList from "@/hooks/carts/useCartList";
import React from "react";
import SectionShowDataLoading from "../common/SectionShowDataLoading";
import NotFoundCart from "./NotFoundCart";
import CartItem from "./CartItem";

export default function CartList() {
  const { carts, error, isLoading } = useCartList();

  return (
    <div id="cart-list" className="min-h-screen px-4 py-6 bg-white">
      {isLoading ? (
        <SectionShowDataLoading />
      ) : carts.length == 0 ? (
        <NotFoundCart />
      ) : (
        <div className="">
          <div className="flex flex-col gap-5">
            {carts.map((cart) => (
              <div key={cart.id} className="shadow p-3">
                <CartItem items={cart.items} createdAt={cart.createdAt} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

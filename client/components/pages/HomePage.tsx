"use client";

import ProductList from "../common/ProductList";
import Hero from "../users/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductList role="user" />
    </>
  );
}

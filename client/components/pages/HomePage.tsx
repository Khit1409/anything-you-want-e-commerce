"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Navbar from "../users/Navbar";

export default function HomePage() {
  const { isLoggedIn, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <>
      <Navbar />
      <p>{isLoggedIn ? "Đã đăng nhập" : "Chưa đăng nhập"}</p>
      <p>{loading ? "loading..." : null}</p>
      <p>{error ? error : null}</p>
    </>
  );
}

"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { axiosClient } from "@/configs/axios.config";

export default function Navbar() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const logout = async () => {
    const res = await axiosClient.post("/auth/logout", { role: "user" });
    console.log(res.data);
  };

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
}

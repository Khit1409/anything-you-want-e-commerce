"use client";

import { FormEvent, useState } from "react";
import LoginForm from "../common/LoginForm";
import LoginText from "../common/LoginText";
import { LoginData } from "@/api/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginThunk } from "@/redux/thunk/auth.thunk";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [loginData, setLoginData] = useState<LoginData>({
    currentPassword: "",
    emailAddress: "",
    loginRole: "user",
  });

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginThunk(loginData));
    if (loginThunk.fulfilled.match(result) && result.payload) {
      console.log(result.payload);
    } else {
      alert(result.payload);
    }
  };

  return (
    <div className="login-bg-img min-h-screen w-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="backdrop-blur-sm w-full min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl min-h-[600px] rounded-2xl shadow-2xl overflow-hidden">
          <LoginText />
          <LoginForm setState={setLoginData} submit={submitForm} />
        </div>
      </div>
    </div>
  );
}

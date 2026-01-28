"use client";

import { AppDispatch } from "@/redux/store";
import { authThunk } from "@/redux/thunk/auth.thunk";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface IWarpperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: IWarpperProps) {
  const dispatch = useDispatch<AppDispatch>();
  const role = "user";

  useEffect(() => {
    const fetchAuth = async () => await dispatch(authThunk({ role }));
    fetchAuth();
  }, [role, dispatch]);

  return <>{children}</>;
}

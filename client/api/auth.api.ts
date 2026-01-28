import { axiosClient } from "@/configs/axios.config";
import { IAuthenticationResponse } from "@/interfaces/common/auth.interface";
import { Role } from "@/interfaces/common/role.interface";
import axios from "axios";

export interface LoginData {
  emailAddress: string;
  currentPassword: string;
  loginRole: "user" | "seller";
}
export interface LoginResponse {
  message: string;
  success: boolean;
  timestamp: Date | string;
}
/**
 *
 * @param param0
 * @returns
 */
export async function loginService({
  currentPassword,
  emailAddress,
  loginRole,
}: LoginData): Promise<LoginResponse> {
  try {
    const res = await axiosClient.post("/auth/login", {
      currentPassword,
      emailAddress,
      loginRole,
    });
    const data: LoginResponse = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return {
      message: "Server error!",
      success: false,
      timestamp: new Date(),
    };
  }
}
/**
 * @param role
 * @returns
 */
export async function authService(
  role: Role
): Promise<IAuthenticationResponse> {
  try {
    const res = await axiosClient.get(`/auth/me/${role}`);
    const api: IAuthenticationResponse = res.data;
    return api;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message,
        success: false,
        data: null,
        timestamp: new Date(),
      };
    }
    return {
      message: "SERVER_ERROR",
      success: false,
      data: null,
      timestamp: new Date(),
    };
  }
}

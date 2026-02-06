import { CartRequest } from "@/interfaces/request/cart.request";
import {
  CartApiResponse,
  CartResponse,
} from "@/interfaces/response/cart.response";
import { axiosClient } from "@/lib/configs/axios.config";

export async function addToCartService(data: CartRequest) {
  try {
    const res = await axiosClient.post("/carts", data);
    const api = res.data;
    return api;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCartService(): Promise<Array<CartResponse>> {
  const res = await axiosClient.get("/carts");
  const api = res.data as CartApiResponse;
  const carts = api.data.carts;
  return carts;
}

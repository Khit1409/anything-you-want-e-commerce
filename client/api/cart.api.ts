import { CartRequest } from "@/interfaces/request/cart.request";
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

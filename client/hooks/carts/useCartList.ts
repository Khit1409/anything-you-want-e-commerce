import { getUserCartService } from "@/api/cart.api";
import { useQuery } from "@tanstack/react-query";

export default function useCartList() {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: () => {
      return getUserCartService();
    },
  });

  return { carts: data, isLoading, error };
}

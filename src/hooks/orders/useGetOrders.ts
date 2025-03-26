import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types.ts";

export const useGetOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: async (): Promise<Order[]> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch orders: ${error}`);
      }

      const orders: Order[] = await res.json();
      return orders;
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types.ts";

export const useGetOrderById = (orderId: string) => {
  return useQuery<Order, Error>({
    queryKey: [`order`, orderId],
    queryFn: async (): Promise<Order> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch order: ${error}`);
      }

      const order: Order = await res.json();
      return order;
    },
    enabled: !!orderId, // Only run when category ID exists
  });
};

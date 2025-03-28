import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types.ts";

type IncludeString = "user" | "order_items" | "user,order_items";

export const useGetOrders = (include?: IncludeString) => {
  return useQuery<Order[], Error>({
    queryKey: ["orders", include],
    queryFn: async (): Promise<Order[]> => {
      let url = `${import.meta.env.VITE_API_URL}/api/orders`;
      if (include) {
        url += `?include=${include}`;
      }
      const res = await fetch(url);

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch orders: ${error}`);
      }

      return await res.json();
    },
  });
};

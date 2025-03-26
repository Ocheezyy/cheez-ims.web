import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types.ts";

export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch products: ${error}`);
      }

      const products: Product[] = await res.json();
      return products;
    },
  });
};

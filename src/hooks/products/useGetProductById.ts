import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types.ts";

export const useGetProductById = (productId: string) => {
  return useQuery<Product, Error>({
    queryKey: [`product`, productId],
    queryFn: async (): Promise<Product> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch product: ${error}`);
      }

      const product: Product = await res.json();
      return product;
    },
    enabled: !!productId, // Only run when product ID exists
  });
};

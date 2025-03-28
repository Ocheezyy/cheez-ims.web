import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types.ts";

type IncludeString = "category,supplier" | "category" | "supplier";

export const useGetProducts = (include?: IncludeString) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", include],
    queryFn: async (): Promise<Product[]> => {
      let url = `${import.meta.env.VITE_API_URL}/api/products`;
      if (include) url += `?include=${include}`;
      const res = await fetch(url);

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch products: ${error}`);
      }

      return await res.json();
    },
  });
};

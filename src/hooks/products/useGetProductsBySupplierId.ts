import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types.ts";

export const useGetProductsBySupplierId = (supplierId: string) => {
  return useQuery<Product[], Error>({
    queryKey: [`supplierProducts`, supplierId],
    queryFn: async (): Promise<Product[]> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/SuppliersPage/Products/${supplierId}`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch product: ${error}`);
      }

      return await res.json();
    },
    enabled: !!supplierId, // Only run when supplier ID exists
  });
};

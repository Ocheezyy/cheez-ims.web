import { useQuery } from "@tanstack/react-query";
import { Supplier } from "@/types.ts";

export const useGetSupplierById = (supplierId: string) => {
  return useQuery<Supplier, Error>({
    queryKey: [`supplier`, supplierId],
    queryFn: async (): Promise<Supplier> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/suppliers/${supplierId}`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch supplier: ${error}`);
      }

      const product: Supplier = await res.json();
      return product;
    },
    enabled: !!supplierId, // Only run when product ID exists
  });
};

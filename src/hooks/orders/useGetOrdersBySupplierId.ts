import { useQuery } from "@tanstack/react-query";
import { SupplierOrder } from "@/types.ts";

export const useGetOrdersBySupplierId = (supplierId: string) => {
  return useQuery<SupplierOrder[], Error>({
    queryKey: [`supplierOrders`, supplierId],
    queryFn: async (): Promise<SupplierOrder[]> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/SuppliersPage/Orders/${supplierId}`,
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

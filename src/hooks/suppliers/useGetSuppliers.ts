import { useQuery } from "@tanstack/react-query";
import { Supplier } from "@/types.ts";

export const useGetSuppliers = () => {
  return useQuery<Supplier[], Error>({
    queryKey: ["suppliers"],
    queryFn: async (): Promise<Supplier[]> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suppliers`);

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch suppliers: ${error}`);
      }

      const suppliers: Supplier[] = await res.json();
      return suppliers;
    },
  });
};

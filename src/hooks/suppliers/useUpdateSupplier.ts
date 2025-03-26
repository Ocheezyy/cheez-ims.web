import { useMutation } from "@tanstack/react-query";
import { Supplier } from "@/types.ts";
import { toast } from "sonner";

export const useUpdateSupplier = () => {
  return useMutation({
    mutationFn: async (updateSupplier: Supplier): Promise<Supplier> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/suppliers/${updateSupplier.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateSupplier),
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to update supplier: ${error}`);
      }

      const updatedSupplierResponse: Supplier = await res.json();
      return updatedSupplierResponse;
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast("Failed to update supplier");
    },
    onSuccess: () => {
      toast("Supplier updated!");
    },
  });
};

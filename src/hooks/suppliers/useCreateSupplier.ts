import { useMutation } from "@tanstack/react-query";
import { Supplier } from "@/types.ts";
import { toast } from "sonner";

export const useCreateSupplier = () => {
  return useMutation({
    mutationFn: async (newSupplier: Supplier): Promise<Supplier> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suppliers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to create supplier: ${error}`);
      }

      const createdSupplier: Supplier = await res.json();
      return createdSupplier;
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast("Failed to create supplier");
    },
    onSuccess: () => {
      toast("Supplier created!");
    },
  });
};

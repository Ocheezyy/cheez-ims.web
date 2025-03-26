import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteSupplier = () => {
  return useMutation({
    mutationFn: async (supplierId: string): Promise<void> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/suppliers/${supplierId}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to delete supplier: ${error}`);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error("Failed to delete supplier");
    },
    onSuccess: () => {
      toast("Supplier deleted!");
    },
  });
};

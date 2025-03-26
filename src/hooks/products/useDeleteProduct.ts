import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (productId: string): Promise<void> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to delete product: ${error}`);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error("Failed to delete product");
    },
    onSuccess: () => {
      toast("Product deleted!");
    },
  });
};

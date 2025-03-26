import { useMutation } from "@tanstack/react-query";
import { Product } from "@/types.ts";
import { toast } from "sonner";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async (updatedProduct: Product): Promise<Product> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to update product: ${error}`);
      }

      const updatedProductResponse: Product = await res.json();
      return updatedProductResponse;
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast("Failed to update product");
    },
    onSuccess: () => {
      toast("Product updated!");
    },
  });
};

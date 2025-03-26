import { useMutation } from "@tanstack/react-query";
import { Product } from "@/types.ts";
import { toast } from "sonner";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (newProduct: Product): Promise<Product> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to create order: ${error}`);
      }

      const createdProduct: Product = await res.json();
      return createdProduct;
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast("Failed to create product");
    },
    onSuccess: () => {
      toast("Product created!");
    },
  });
};

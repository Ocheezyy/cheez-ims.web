import { useMutation } from "@tanstack/react-query";
import { Category } from "@/types.ts";
import { toast } from "sonner";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (newCategory: Category): Promise<Category> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to create category: ${error}`);
      }

      const createdCategory: Category = await res.json();
      return createdCategory;
    },
    onError: (error: Error) => {
      console.error("Error creating category: ", error.message);
      toast("Failed to create category");
    },
    onSuccess: () => {
      toast("Category created!");
    },
  });
};

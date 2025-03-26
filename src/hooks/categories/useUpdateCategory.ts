import { useMutation } from "@tanstack/react-query";
import { Category } from "@/types.ts";
import { toast } from "sonner";

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: async (updatedCategory: Category): Promise<Category> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${updatedCategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCategory),
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to update category: ${error}`);
      }

      const updatedCategoryResponse: Category = await res.json();
      return updatedCategoryResponse;
    },
    onError: (error: Error) => {
      console.error("Error updating category: ", error.message);
      toast("Failed to update category");
    },
    onSuccess: () => {
      toast("Category updated!");
    },
  });
};

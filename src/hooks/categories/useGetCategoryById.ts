import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types.ts";

export const useGetCategoryById = (categoryId: string) => {
  return useQuery<Category, Error>({
    queryKey: [`category`, categoryId],
    queryFn: async (): Promise<Category> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`,
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch categories: ${error}`);
      }

      const category: Category = await res.json();
      return category;
    },
    enabled: !!categoryId, // Only run when category ID exists
  });
};

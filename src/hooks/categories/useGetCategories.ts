import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types.ts";

export const useGetCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to fetch categories: ${error}`);
      }

      const categories: Category[] = await res.json();
      return categories;
    },
  });
};

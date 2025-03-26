import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (categoryId: string): Promise<void> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/${categoryId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to delete category: ${error}`);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast.error("Failed to delete category");
    },
    onSuccess: () => {
      toast("Category deleted!");
    },
  });
};

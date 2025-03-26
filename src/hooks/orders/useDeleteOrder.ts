import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: async (orderId: string): Promise<void> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to update order: ${error}`);
      }
    },
    onError: (error: Error) => {
      console.error("Error deleting order: ", error.message);
      toast.error("Failed to delete order");
    },
    onSuccess: () => {
      toast("Order deleted!");
    },
  });
};

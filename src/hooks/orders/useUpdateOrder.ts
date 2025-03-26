import { useMutation } from "@tanstack/react-query";
import { Order } from "@/types.ts";
import { toast } from "sonner";

export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: async (updatedOrder: Order): Promise<Order> => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${updatedOrder.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedOrder),
        },
      );

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to update order: ${error}`);
      }

      const updatedOrderResponse: Order = await res.json();
      return updatedOrderResponse;
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast("Failed to update order");
    },
    onSuccess: () => {
      toast("Order updated!");
    },
  });
};

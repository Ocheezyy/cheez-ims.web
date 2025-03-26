import { useMutation } from "@tanstack/react-query";
import { Order } from "@/types.ts";
import { toast } from "sonner";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (newOrder: Order): Promise<Order> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to create order: ${error}`);
      }

      const createdOrder: Order = await res.json();
      return createdOrder;
    },
    onError: (error: Error) => {
      console.error(error.message);
      toast("Failed to create order");
    },
    onSuccess: () => {
      toast("Order created!");
    },
  });
};

import { createFileRoute } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OrdersTable } from "@/components/orders/table";
import { OrdersFilters } from "@/components/orders/filters";
import { DateRangePicker } from "@/components/date-range-picker";
import { useGetOrders } from "@/hooks/orders/useGetOrders.ts";
import { toast } from "sonner";
import { useEffect } from "react";

export const Route = createFileRoute("/orders/")({
  component: OrdersPage,
});

function OrdersPage() {
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetOrders("user,order_items");

  useEffect(() => {
    if (isError) toast.error("Failed to get orders");
  }, [isError]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            View and manage customer orders
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
          <Button>Create Order</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <OrdersFilters className="md:w-64" />

        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex items-center gap-2">
              <DateRangePicker />
            </div>
          </div>

          <Card>
            <OrdersTable orderData={orderData || []} isLoading={isLoading} />
          </Card>
        </div>
      </div>
    </div>
  );
}

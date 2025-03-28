import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Download, Package } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Route as OrdersRoute } from "./index.tsx";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderTimeline } from "@/components/orders/orderId/timeline";
import { OrderDetailsTable } from "@/components/orders/orderId/details-table";
import { useGetOrderById } from "@/hooks/orders/useGetOrderById.ts";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  formatNumbers,
  getOrderStatusColor,
  getOrderStatusText,
  getPaymentMethodText,
  getPaymentStatusColor,
  getPaymentStatusText,
} from "@/lib/utils.ts";
import { format } from "date-fns";

export const Route = createFileRoute("/orders/$orderId")({
  component: OrderDetailsPage,
});

function OrderDetailsPage() {
  const { orderId } = Route.useParams();
  const { data: order, isLoading, isError } = useGetOrderById(orderId);

  const taxVal = order ? order.totalAmount * 0.07 : 0;
  const tax = formatNumbers(true, taxVal);
  const subtotal = formatNumbers(true, order?.totalAmount!! - taxVal - 5.99);
  const shipping = order ? formatNumbers(true, 5.99) : formatNumbers(true, 0);
  const total = formatNumbers(true, order?.totalAmount);

  const shippingAddressSplit = order ? order.shippingAddress.split(",") : null;
  const shippingAddressObj = shippingAddressSplit
    ? {
        streetAddress: shippingAddressSplit[0],
        city: shippingAddressSplit[1],
        state: shippingAddressSplit[2].split(" ")[0],
        zipCode: shippingAddressSplit[2].split(" ")[1],
        country: "USA",
      }
    : {
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      };

  useEffect(() => {
    if (isError) toast.error("Failed to get order!");
  }, [isError]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to={OrdersRoute.to}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to orders</span>
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            Order {order?.orderNumber}
          </h2>
          <Badge
            variant="outline"
            className={getOrderStatusColor(order?.status)}
          >
            {getOrderStatusText(order?.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
              <CardDescription>
                Items included in order #{order?.orderNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderDetailsTable items={order?.orderItems || []} />
            </CardContent>
            <CardFooter className="flex flex-col items-end border-t p-4">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{total}</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>
                Track the progress of order {order?.orderNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTimeline order={order} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold">Contact Details</h4>
                <div className="mt-1 text-sm">
                  <p className="font-medium">{`${order?.user.firstName} ${order?.user.lastName}`}</p>
                  <p className="text-muted-foreground">{order?.user.email}</p>
                  <p className="text-muted-foreground">{order?.user.phone}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold">Shipping Address</h4>
                <div className="mt-1 text-sm">
                  <p>{shippingAddressObj.streetAddress}</p>
                  <p>
                    {shippingAddressObj.city}, {shippingAddressObj.state}{" "}
                    {shippingAddressObj.zipCode}
                  </p>
                  <p>{shippingAddressObj.country}</p>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold">Billing Address</h4>
                <div className="mt-1 text-sm">
                  <p>{shippingAddressObj.streetAddress}</p>
                  <p>
                    {shippingAddressObj.city}, {shippingAddressObj.state}{" "}
                    {shippingAddressObj.zipCode}
                  </p>
                  <p>{shippingAddressObj.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Payment Method</span>
                <span className="text-sm">
                  {getPaymentMethodText(order?.paymentMethod)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Payment Status</span>
                <Badge
                  variant="outline"
                  className={getPaymentStatusColor(order?.paymentStatus)}
                >
                  {getPaymentStatusText(order?.paymentStatus)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Order Date</span>
                <span className="text-sm">
                  {order ? format(order.orderDate, "MMMM d, yyyy") : ""}
                </span>
              </div>
            </CardContent>
          </Card>

          {/*<Card>*/}
          {/*  <CardHeader>*/}
          {/*    <CardTitle>Notes</CardTitle>*/}
          {/*  </CardHeader>*/}
          {/*  <CardContent>*/}
          {/*    <textarea*/}
          {/*      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"*/}
          {/*      placeholder="Add notes about this order..."*/}
          {/*    />*/}
          {/*  </CardContent>*/}
          {/*  <CardFooter>*/}
          {/*    <Button size="sm">Save Notes</Button>*/}
          {/*  </CardFooter>*/}
          {/*</Card>*/}
        </div>
      </div>
    </div>
  );
}

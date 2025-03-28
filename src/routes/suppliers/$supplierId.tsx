import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  Phone,
  Star,
  Truck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplierOrdersTable } from "@/components/suppliers/supplierId/orders-table";
import { SupplierProductsTable } from "@/components/suppliers/supplierId/products-table";
import { SupplierPerformance } from "@/components/suppliers/supplierId/performance";
import { useGetSupplierById } from "@/hooks/suppliers/useGetSupplierById.ts";
import { useGetProductsBySupplierId } from "@/hooks/products/useGetProductsBySupplierId.ts";
import { useGetOrdersBySupplierId } from "@/hooks/orders/useGetOrdersBySupplierId.ts";
import {
  formatPhoneNumber,
  getSupplierStatusColor,
  getSupplierStatusText,
} from "@/lib/utils.ts";
import { format } from "date-fns";
import { toast } from "sonner";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/suppliers/$supplierId")({
  component: SupplierDetailsPage,
});

function SupplierDetailsPage() {
  const { supplierId } = Route.useParams();
  const {
    data: supplierData,
    isLoading: supplierLoading,
    isError: supplierError,
  } = useGetSupplierById(supplierId);
  const { data: productData, isLoading: productLoading } =
    useGetProductsBySupplierId(supplierId);
  const { data: orderData, isLoading: orderLoading } =
    useGetOrdersBySupplierId(supplierId);

  useEffect(() => {
    if (supplierError) toast.error("Failed to get supplier");
  }, [supplierError]);

  if (supplierLoading) return <SupplierSkeleton />;

  const lastOrderDate = orderData
    ? format(
        new Date(
          orderData?.sort(
            (a, b) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
          )?.[0].orderDate,
        ),
        "mm/dd/yyyy",
      )
    : null;

  const supplierAddressSplit = supplierData
    ? supplierData.address.split(",")
    : null;
  const supplierAddressObj = supplierAddressSplit
    ? {
        streetAddress: supplierAddressSplit[0],
        city: supplierAddressSplit[1],
        state: supplierAddressSplit[2].split(" ")[0],
        zipCode: supplierAddressSplit[2].split(" ")[1],
        country: "USA",
      }
    : {
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/suppliers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to suppliers</span>
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            {supplierData?.name}
          </h2>
          <Badge
            variant="outline"
            className={getSupplierStatusColor(supplierData?.status)}
          >
            {getSupplierStatusText(supplierData?.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            Place Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>Supplier Overview</CardTitle>
                  <CardDescription>
                    Key information about {supplierData?.name}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${supplierData && i < Math.floor(supplierData.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">
                    {supplierData?.rating}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="relative h-32 w-32 rounded-md overflow-hidden border">
                    <img
                      src={"/placeholder.svg"}
                      alt={supplierData?.name}
                      className="object-contain p-2"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/*<div>*/}
                    {/*  <h4 className="text-sm font-medium text-muted-foreground">*/}
                    {/*    Category*/}
                    {/*  </h4>*/}
                    {/*  <p>{supplier.category}</p>*/}
                    {/*</div>*/}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Year Started
                      </h4>
                      <p>2015</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Payment Terms
                      </h4>
                      <p>Net 30</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Shipping Terms
                      </h4>
                      <p>FOB Destination</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Min Order Value
                      </h4>
                      <p>$500</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Lead Time
                      </h4>
                      <p>3-5 business days</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Description
                    </h4>
                    <p className="text-sm">
                      {supplierData?.name} is a leading supplier of electronic
                      components and accessories. They specialize in
                      high-quality input devices, audio equipment, and mobile
                      accessories.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Products Supplied</CardTitle>
                  <CardDescription>
                    Products currently sourced from this supplier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierProductsTable
                    data={productData || []}
                    isLoading={productLoading}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Recent orders placed with this supplier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierOrdersTable
                    data={orderData || []}
                    isLoading={orderLoading}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance</CardTitle>
                  <CardDescription>
                    Performance metrics and KPIs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierPerformance />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Company Address</h4>
                  <address className="not-italic text-sm text-muted-foreground">
                    {supplierAddressObj.streetAddress}
                    <br />
                    {supplierAddressObj.city}, {supplierAddressObj.state}{" "}
                    {supplierAddressObj.zipCode}
                    <br />
                    {supplierAddressObj.country}
                  </address>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatPhoneNumber(supplierData?.phone)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-sm text-muted-foreground">
                    {supplierData?.contactEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Website</h4>
                  <p className="text-sm text-muted-foreground">
                    {supplierData
                      ? `https://${supplierData.name.replace(" ", "-")}.com`
                      : ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Active Products</span>
                  <span className="font-medium">{productData?.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Orders</span>
                  <span className="font-medium">{orderData?.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Order</span>
                  <span className="font-medium">{lastOrderDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Years as Supplier</span>
                  <span className="font-medium">
                    {new Date().getFullYear() - 2015}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/*<Card>*/}
          {/*  <CardHeader>*/}
          {/*    <CardTitle>Send Message</CardTitle>*/}
          {/*  </CardHeader>*/}
          {/*  <CardContent>*/}
          {/*    <SupplierContactForm />*/}
          {/*  </CardContent>*/}
          {/*</Card>*/}
        </div>
      </div>
    </div>
  );
}

function SupplierSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5" />
                  ))}
                  <Skeleton className="h-5 w-6 ml-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="h-32 w-32 rounded-md" />
                <div className="flex-1 space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-48" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="products">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-10" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

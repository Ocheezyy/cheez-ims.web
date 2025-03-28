import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SuppliersTable } from "@/components/suppliers/table";
import { SuppliersFilters } from "@/components/suppliers/filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SuppliersGridView } from "@/components/suppliers/grid-view";
import { useGetSuppliers } from "@/hooks/suppliers/useGetSuppliers.ts";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/suppliers/")({
  component: SuppliersPage,
});

function SuppliersPage() {
  const {
    data: supplierData,
    isLoading,
    isError: supplierError,
  } = useGetSuppliers();

  useEffect(() => {
    if (supplierError) toast.error("Failed to get suppliers!");
  }, [supplierError]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
          <p className="text-muted-foreground">
            Manage your suppliers and vendor relationships
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <SuppliersFilters className="md:w-64" />

        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search suppliers..."
                className="pl-8 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-0">
              <Card>
                <SuppliersTable isLoading={isLoading} data={supplierData} />
              </Card>
            </TabsContent>
            <TabsContent value="grid" className="mt-0">
              <SuppliersGridView
                isLoading={isLoading}
                data={supplierData || []}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

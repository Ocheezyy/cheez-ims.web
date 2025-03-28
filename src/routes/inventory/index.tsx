import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryFilters } from "@/components/inventory/filters";
import { InventoryFullTable } from "@/components/inventory/full-table";
import { InventoryGridView } from "@/components/inventory/grid-view";

import { createFileRoute } from "@tanstack/react-router";
import { useGetProducts } from "@/hooks/products/useGetProducts.ts";
import { toast } from "sonner";
import { useEffect } from "react";
import { useGetCategories } from "@/hooks/categories/useGetCategories.ts";

export const Route = createFileRoute("/inventory/")({
  component: InventoryPage,
});

function InventoryPage() {
  const {
    data: productData,
    isLoading,
    isError: productError,
  } = useGetProducts("category,supplier");

  const { data: categoryData, isError: categoryError } = useGetCategories();

  useEffect(() => {
    if (productError) toast.error("Failed to get inventory");
    if (categoryError) toast.error("Failed to get categories");
  }, [categoryError, productError]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            Manage your products, stock levels, and categories
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <InventoryFilters
          className="md:w-64"
          categoryData={categoryData || []}
        />

        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
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
                <InventoryFullTable
                  productData={productData || []}
                  isLoading={isLoading}
                />
              </Card>
            </TabsContent>
            <TabsContent value="grid" className="mt-0">
              <InventoryGridView productData={productData || []} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

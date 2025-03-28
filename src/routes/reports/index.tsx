import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportDateRangePicker } from "@/components/reports/date-range-picker";
import { ReportOverview } from "@/components/reports/overview";
import { InventoryReports } from "@/components/reports/inventory-reports";
import { SalesReports } from "@/components/reports/sales-reports";
import { SupplierReports } from "@/components/reports/supplier-reports";
import { FinancialReports } from "@/components/reports/financial-reports";
import { SavedReports } from "@/components/reports/saved-reports";

export const Route = createFileRoute("/reports/")({
  component: ReportsPage,
});

import { Download, Filter, Printer } from "lucide-react";

function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Analyze your inventory, sales, and supplier data
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ReportDateRangePicker />
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:w-[800px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ReportOverview />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <InventoryReports />
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <SalesReports />
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <SupplierReports />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <SavedReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}

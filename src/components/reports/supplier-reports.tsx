import { useState } from "react";
import { ArrowUpDown, Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const supplierPerformance = [
  {
    id: "SUP-001",
    name: "TechGear Solutions",
    category: "Electronics",
    orders: 47,
    onTimeDelivery: 95,
    qualityScore: 4.8,
    responseTime: 4,
  },
  {
    id: "SUP-002",
    name: "OfficeSmart",
    category: "Office Supplies",
    orders: 32,
    onTimeDelivery: 92,
    qualityScore: 4.5,
    responseTime: 6,
  },
  {
    id: "SUP-003",
    name: "AudioTech Inc.",
    category: "Electronics",
    orders: 28,
    onTimeDelivery: 98,
    qualityScore: 4.7,
    responseTime: 3,
  },
  {
    id: "SUP-004",
    name: "CablePro Ltd.",
    category: "Accessories",
    orders: 25,
    onTimeDelivery: 88,
    qualityScore: 3.9,
    responseTime: 8,
  },
  {
    id: "SUP-005",
    name: "ConnectAll Inc.",
    category: "Accessories",
    orders: 22,
    onTimeDelivery: 90,
    qualityScore: 4.2,
    responseTime: 5,
  },
];

const supplierSpend = [
  { name: "TechGear Solutions", value: 125000 },
  { name: "OfficeSmart", value: 85000 },
  { name: "AudioTech Inc.", value: 65000 },
  { name: "CablePro Ltd.", value: 45000 },
  { name: "Other Suppliers", value: 80000 },
];

const leadTimeData = [
  { supplier: "TechGear Solutions", leadTime: 4 },
  { supplier: "OfficeSmart", leadTime: 6 },
  { supplier: "AudioTech Inc.", leadTime: 3 },
  { supplier: "CablePro Ltd.", leadTime: 8 },
  { supplier: "ConnectAll Inc.", leadTime: 5 },
  { supplier: "PowerUp Electronics", leadTime: 7 },
  { supplier: "TechWear Ltd.", leadTime: 5 },
  { supplier: "DataStore Inc.", leadTime: 4 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function SupplierReports() {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>("desc");
  const [sortBy, setSortBy] = useState<string | null>("orders");

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSorting(sorting === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSorting("asc");
    }
  };

  const sortedSuppliers = [...supplierPerformance].sort((a, b) => {
    if (!sortBy || !sorting) return 0;

    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sorting === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sorting === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-medium">Supplier Reports</h3>
          <p className="text-sm text-muted-foreground">
            Analyze supplier performance, spending, and optimize your supply
            chain
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Save Report
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="spend">Spend Analysis</TabsTrigger>
          <TabsTrigger value="leadtime">Lead Times</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance</CardTitle>
              <CardDescription>
                Key performance metrics for your top suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("name")}
                      className="cursor-pointer"
                    >
                      Supplier
                      {sortBy === "name" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("category")}
                      className="cursor-pointer"
                    >
                      Category
                      {sortBy === "category" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("orders")}
                      className="cursor-pointer text-center"
                    >
                      Orders
                      {sortBy === "orders" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("onTimeDelivery")}
                      className="cursor-pointer text-center"
                    >
                      On-Time %
                      {sortBy === "onTimeDelivery" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("qualityScore")}
                      className="cursor-pointer text-center"
                    >
                      Quality
                      {sortBy === "qualityScore" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("responseTime")}
                      className="cursor-pointer text-center"
                    >
                      Response (hrs)
                      {sortBy === "responseTime" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">
                        {supplier.name}
                      </TableCell>
                      <TableCell>{supplier.category}</TableCell>
                      <TableCell className="text-center">
                        {supplier.orders}
                      </TableCell>
                      <TableCell className="text-center">
                        {supplier.onTimeDelivery}%
                      </TableCell>
                      <TableCell className="text-center">
                        {supplier.qualityScore.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-center">
                        {supplier.responseTime}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            supplier.qualityScore >= 4.5
                              ? "bg-green-500/15 text-green-600"
                              : supplier.qualityScore >= 4.0
                                ? "bg-blue-500/15 text-blue-600"
                                : supplier.qualityScore >= 3.5
                                  ? "bg-yellow-500/15 text-yellow-600"
                                  : "bg-red-500/15 text-red-600"
                          }
                        >
                          {supplier.qualityScore >= 4.5
                            ? "Excellent"
                            : supplier.qualityScore >= 4.0
                              ? "Good"
                              : supplier.qualityScore >= 3.5
                                ? "Average"
                                : "Poor"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                AudioTech Inc. has the highest on-time delivery rate at 98% and
                the fastest response time at 3 hours.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="spend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Spend Analysis</CardTitle>
              <CardDescription>
                Distribution of spending across suppliers
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={supplierSpend}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {supplierSpend.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Spend",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">Spend</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierSpend.map((supplier) => (
                      <TableRow key={supplier.name}>
                        <TableCell className="font-medium">
                          {supplier.name}
                        </TableCell>
                        <TableCell className="text-right">
                          ${supplier.value.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {(
                            (supplier.value /
                              supplierSpend.reduce(
                                (sum, s) => sum + s.value,
                                0,
                              )) *
                            100
                          ).toFixed(1)}
                          %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                TechGear Solutions accounts for 31.3% of your total supplier
                spend. Consider negotiating better terms with your top
                suppliers.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="leadtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Lead Times</CardTitle>
              <CardDescription>
                Average lead times in days by supplier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={leadTimeData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="supplier" type="category" />
                    <Tooltip
                      formatter={(value) => [`${value} days`, "Lead Time"]}
                    />
                    <Legend />
                    <Bar
                      dataKey="leadTime"
                      name="Lead Time (days)"
                      fill="#8884d8"
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                AudioTech Inc. has the shortest lead time at 3 days, while
                CablePro Ltd. has the longest at 8 days. The average lead time
                across all suppliers is 5.25 days.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

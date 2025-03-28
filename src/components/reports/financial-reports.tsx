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
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const profitMarginData = [
  { month: "Jan", revenue: 65000, cogs: 39000, profit: 26000, margin: 40.0 },
  { month: "Feb", revenue: 72000, cogs: 42500, profit: 29500, margin: 41.0 },
  { month: "Mar", revenue: 68000, cogs: 40800, profit: 27200, margin: 40.0 },
  { month: "Apr", revenue: 75000, cogs: 43500, profit: 31500, margin: 42.0 },
  { month: "May", revenue: 82000, cogs: 47500, profit: 34500, margin: 42.1 },
  { month: "Jun", revenue: 90000, cogs: 51300, profit: 38700, margin: 43.0 },
];

const categoryMargins = [
  {
    category: "Electronics",
    revenue: 125000,
    cogs: 68750,
    profit: 56250,
    margin: 45.0,
  },
  {
    category: "Accessories",
    revenue: 75000,
    cogs: 41250,
    profit: 33750,
    margin: 45.0,
  },
  {
    category: "Office",
    revenue: 45000,
    cogs: 27000,
    profit: 18000,
    margin: 40.0,
  },
  {
    category: "Storage",
    revenue: 30000,
    cogs: 18000,
    profit: 12000,
    margin: 40.0,
  },
  {
    category: "Wearables",
    revenue: 25000,
    cogs: 13750,
    profit: 11250,
    margin: 45.0,
  },
];

const inventoryValue = [
  { month: "Jan", value: 275000 },
  { month: "Feb", value: 282000 },
  { month: "Mar", value: 290000 },
  { month: "Apr", value: 285000 },
  { month: "May", value: 295000 },
  { month: "Jun", value: 300000 },
];

export function FinancialReports() {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>("desc");
  const [sortBy, setSortBy] = useState<string | null>("revenue");

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSorting(sorting === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSorting("asc");
    }
  };

  const sortedCategories = [...categoryMargins].sort((a, b) => {
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
          <h3 className="text-lg font-medium">Financial Reports</h3>
          <p className="text-sm text-muted-foreground">
            Analyze profitability, margins, and financial performance
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

      <Tabs defaultValue="profit" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
          <TabsTrigger value="margins">Margins</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Value</TabsTrigger>
        </TabsList>

        <TabsContent value="profit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss</CardTitle>
              <CardDescription>
                Monthly revenue, cost of goods sold, and profit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={profitMarginData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    />
                    <Legend />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      stackId="a"
                      fill="#8884d8"
                    />
                    <Bar
                      dataKey="cogs"
                      name="Cost of Goods Sold"
                      stackId="a"
                      fill="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      name="Profit"
                      stroke="#ff7300"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Monthly profit has increased by 48.8% from January to June, with
                consistent profit margin improvement.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit Margin Trend</CardTitle>
              <CardDescription>
                Monthly profit margin percentage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={profitMarginData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      domain={[38, 44]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Profit Margin"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="margin"
                      name="Profit Margin"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="margins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Profit Margins</CardTitle>
              <CardDescription>
                Profit margins by product category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
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
                      onClick={() => handleSort("revenue")}
                      className="cursor-pointer text-right"
                    >
                      Revenue
                      {sortBy === "revenue" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("cogs")}
                      className="cursor-pointer text-right"
                    >
                      COGS
                      {sortBy === "cogs" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("profit")}
                      className="cursor-pointer text-right"
                    >
                      Profit
                      {sortBy === "profit" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("margin")}
                      className="cursor-pointer text-right"
                    >
                      Margin %
                      {sortBy === "margin" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCategories.map((category) => (
                    <TableRow key={category.category}>
                      <TableCell className="font-medium">
                        {category.category}
                      </TableCell>
                      <TableCell className="text-right">
                        ${category.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${category.cogs.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${category.profit.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {category.margin.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Electronics, Accessories, and Wearables have the highest profit
                margins at 45%.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Margin Comparison</CardTitle>
              <CardDescription>
                Visual comparison of profit margins by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryMargins}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[35, 50]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="profit"
                      name="Profit ($)"
                      fill="#8884d8"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="margin"
                      name="Margin (%)"
                      stroke="#ff7300"
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Value Trend</CardTitle>
              <CardDescription>Monthly inventory value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={inventoryValue}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[250000, 325000]} />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Inventory Value",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Inventory Value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Inventory value has increased by 9.1% from January to June, with
                a current value of $300,000.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Metrics</CardTitle>
              <CardDescription>Key inventory financial metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Inventory Turnover Ratio
                  </p>
                  <p className="text-2xl font-bold">8.2</p>
                  <p className="text-xs text-green-600">
                    +0.4 from previous period
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Days Inventory Outstanding
                  </p>
                  <p className="text-2xl font-bold">44.5 days</p>
                  <p className="text-xs text-green-600">
                    -2.3 days from previous period
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Inventory to Sales Ratio
                  </p>
                  <p className="text-2xl font-bold">3.33</p>
                  <p className="text-xs text-red-600">
                    +0.08 from previous period
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

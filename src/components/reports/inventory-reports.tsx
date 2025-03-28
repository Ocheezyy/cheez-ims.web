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

const inventoryAging = [
  { age: "0-30 days", value: 125000, percentage: 42 },
  { age: "31-60 days", value: 75000, percentage: 25 },
  { age: "61-90 days", value: 45000, percentage: 15 },
  { age: "91-180 days", value: 30000, percentage: 10 },
  { age: "180+ days", value: 25000, percentage: 8 },
];

const inventoryTurnover = [
  { category: "Electronics", turnover: 8.5 },
  { category: "Accessories", turnover: 12.3 },
  { category: "Office", turnover: 6.7 },
  { category: "Storage", turnover: 5.2 },
  { category: "Wearables", turnover: 9.8 },
];

const lowStockItems = [
  {
    id: "INV003",
    name: "Laptop Stand",
    category: "Office",
    quantity: 15,
    reorderPoint: 20,
    supplier: "OfficeSmart",
  },
  {
    id: "INV005",
    name: "HDMI Adapter",
    category: "Accessories",
    quantity: 10,
    reorderPoint: 15,
    supplier: "ConnectAll Inc.",
  },
  {
    id: "INV010",
    name: "Smart Watch",
    category: "Electronics",
    quantity: 5,
    reorderPoint: 10,
    supplier: "TechWear Ltd.",
  },
  {
    id: "INV012",
    name: "Mechanical Keyboard",
    category: "Electronics",
    quantity: 8,
    reorderPoint: 12,
    supplier: "TechGear Solutions",
  },
  {
    id: "INV015",
    name: "Wireless Earbuds",
    category: "Audio",
    quantity: 7,
    reorderPoint: 15,
    supplier: "AudioTech Inc.",
  },
];

const excessInventory = [
  {
    id: "INV002",
    name: "USB-C Cables (3-pack)",
    category: "Accessories",
    quantity: 120,
    optimalStock: 50,
    value: 2398.8,
  },
  {
    id: "INV007",
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 40,
    optimalStock: 25,
    value: 1599.6,
  },
  {
    id: "INV018",
    name: "Phone Chargers",
    category: "Accessories",
    quantity: 85,
    optimalStock: 40,
    value: 1274.85,
  },
  {
    id: "INV022",
    name: "USB Flash Drives",
    category: "Storage",
    quantity: 95,
    optimalStock: 45,
    value: 1424.05,
  },
  {
    id: "INV025",
    name: "Screen Protectors",
    category: "Accessories",
    quantity: 150,
    optimalStock: 60,
    value: 1499.5,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function InventoryReports() {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSorting(sorting === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSorting("asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-medium">Inventory Reports</h3>
          <p className="text-sm text-muted-foreground">
            Analyze your inventory data, identify issues, and optimize stock
            levels
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

      <Tabs defaultValue="aging" className="space-y-4">
        <TabsList>
          <TabsTrigger value="aging">Inventory Aging</TabsTrigger>
          <TabsTrigger value="turnover">Turnover Rate</TabsTrigger>
          <TabsTrigger value="lowstock">Low Stock</TabsTrigger>
          <TabsTrigger value="excess">Excess Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="aging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Aging Analysis</CardTitle>
              <CardDescription>
                Breakdown of inventory by age to identify slow-moving items
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventoryAging}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="age"
                    >
                      {inventoryAging.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Value",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Age Range</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryAging.map((item) => (
                    <TableRow key={item.age}>
                      <TableCell>{item.age}</TableCell>
                      <TableCell className="text-right">
                        ${item.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.percentage}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                33% of your inventory is over 60 days old. Consider running
                promotions for older inventory.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="turnover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Turnover Rate</CardTitle>
              <CardDescription>
                How quickly inventory is sold by category (turns per year)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryTurnover}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `${value} turns/year`,
                        "Turnover Rate",
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="turnover"
                      name="Turnover Rate"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Accessories have the highest turnover rate at 12.3 turns per
                year, while Storage products have the lowest at 5.2.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="lowstock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>
                Products that are below their reorder point
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("id")}
                      className="cursor-pointer"
                    >
                      ID
                      {sortBy === "id" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("name")}
                      className="cursor-pointer"
                    >
                      Product
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
                      onClick={() => handleSort("quantity")}
                      className="cursor-pointer text-right"
                    >
                      Quantity
                      {sortBy === "quantity" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead className="text-right">Reorder Point</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.reorderPoint}
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                5 products are below their reorder point. Consider placing
                orders with suppliers soon.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="excess" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Excess Inventory</CardTitle>
              <CardDescription>
                Products with stock levels significantly above optimal levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("id")}
                      className="cursor-pointer"
                    >
                      ID
                      {sortBy === "id" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("name")}
                      className="cursor-pointer"
                    >
                      Product
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
                      onClick={() => handleSort("quantity")}
                      className="cursor-pointer text-right"
                    >
                      Quantity
                      {sortBy === "quantity" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                      )}
                    </TableHead>
                    <TableHead className="text-right">Optimal Stock</TableHead>
                    <TableHead className="text-right">Excess Value</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {excessInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.optimalStock}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.value.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Discount
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Total excess inventory value: $8,196.80. Consider running
                promotions to reduce excess stock.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

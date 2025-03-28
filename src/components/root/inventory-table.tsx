import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const data = [
  {
    id: "INV001",
    name: "Wireless Headphones",
    category: "Electronics",
    quantity: 45,
    price: 89.99,
    status: "In Stock",
  },
  {
    id: "INV002",
    name: "USB-C Cables (3-pack)",
    category: "Accessories",
    quantity: 120,
    price: 19.99,
    status: "In Stock",
  },
  {
    id: "INV003",
    name: "Laptop Stand",
    category: "Office",
    quantity: 15,
    price: 49.99,
    status: "Low Stock",
  },
  {
    id: "INV004",
    name: "Wireless Keyboard",
    category: "Electronics",
    quantity: 30,
    price: 69.99,
    status: "In Stock",
  },
  {
    id: "INV005",
    name: "HDMI Adapter",
    category: "Accessories",
    quantity: 10,
    price: 24.99,
    status: "Low Stock",
  },
  {
    id: "INV006",
    name: "Bluetooth Speaker",
    category: "Electronics",
    quantity: 25,
    price: 79.99,
    status: "In Stock",
  },
  {
    id: "INV007",
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 40,
    price: 39.99,
    status: "In Stock",
  },
  {
    id: "INV008",
    name: "Monitor Stand",
    category: "Office",
    quantity: 0,
    price: 59.99,
    status: "Out of Stock",
  },
  {
    id: "INV009",
    name: "Wireless Charger",
    category: "Accessories",
    quantity: 18,
    price: 34.99,
    status: "In Stock",
  },
  {
    id: "INV010",
    name: "Smart Watch",
    category: "Electronics",
    quantity: 5,
    price: 199.99,
    status: "Low Stock",
  },
];

export function InventoryTable() {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSorting(sorting === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSorting("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
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

  const filteredData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/15 text-green-600 hover:bg-green-500/25";
      case "Low Stock":
        return "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25";
      case "Out of Stock":
        return "bg-red-500/15 text-red-600 hover:bg-red-500/25";
      default:
        return "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25";
    }
  };

  return (
    <Card>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[250px]"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Product Name
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
            <TableHead
              onClick={() => handleSort("price")}
              className="cursor-pointer text-right"
            >
              Price
              {sortBy === "price" && (
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No products found matching your search.
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(item.status)}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit product</DropdownMenuItem>
                      <DropdownMenuItem>Update stock</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View history</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

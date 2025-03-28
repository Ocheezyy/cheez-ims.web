import { useState } from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types.ts";
import FullTableSkeleton from "@/components/table-skeleton.tsx";
import {
  formatNumbers,
  getProductStatusColor,
  getProductStatusText,
} from "@/lib/utils.ts";

// const dataold = [
//   {
//     id: "PROD-001",
//     name: "Wireless Headphones",
//     sku: "WH-BT-001",
//     category: "Audio",
//     price: 89.99,
//     cost: 45.0,
//     margin: 49.99,
//     stock: 45,
//     status: "In Stock",
//   },
// ];

interface ProductsTableProps {
  data: Product[];
  isLoading: boolean;
}

export function SupplierProductsTable({ data, isLoading }: ProductsTableProps) {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  if (isLoading) return <FullTableSkeleton />;

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            onClick={() => handleSort("name")}
            className="cursor-pointer"
          >
            Product
            {sortBy === "name" && (
              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            )}
          </TableHead>
          <TableHead className="hidden md:table-cell">SKU</TableHead>
          <TableHead className="hidden lg:table-cell">Category</TableHead>
          <TableHead
            onClick={() => handleSort("price")}
            className="cursor-pointer text-right"
          >
            Price
            {sortBy === "price" && (
              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            )}
          </TableHead>
          <TableHead
            onClick={() => handleSort("stock")}
            className="cursor-pointer text-right"
          >
            Stock
            {sortBy === "stock" && (
              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            )}
          </TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              {product.sku}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {product.category.name}
            </TableCell>
            <TableCell className="text-right">
              {formatNumbers(true, product.price)}
            </TableCell>
            <TableCell className="text-right">
              {product.stockQuantity}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge
                variant="outline"
                className={getProductStatusColor(product.status)}
              >
                {getProductStatusText(product.status)}
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
                  <DropdownMenuItem>View product</DropdownMenuItem>
                  <DropdownMenuItem>Update price</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Order more</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

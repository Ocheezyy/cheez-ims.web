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
import {
  formatNumbers,
  getOrderStatusColor,
  getOrderStatusText,
  getPaymentStatusColor,
  getPaymentStatusText,
} from "@/lib/utils.ts";
import { SupplierOrder } from "@/types.ts";
import FullTableSkeleton from "@/components/table-skeleton.tsx";

interface SuppliersOrderTableProps {
  data?: SupplierOrder[];
  isLoading: boolean;
}

export function SupplierOrdersTable({
  data,
  isLoading,
}: SuppliersOrderTableProps) {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>("desc");
  const [sortBy, setSortBy] = useState<string | null>("date");

  if (isLoading) return <FullTableSkeleton />;

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSorting(sorting === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSorting("asc");
    }
  };

  const sortedData = [...(data || [])].sort((a, b) => {
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
            onClick={() => handleSort("id")}
            className="cursor-pointer"
          >
            Order #
            {sortBy === "id" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
          </TableHead>
          <TableHead
            onClick={() => handleSort("date")}
            className="cursor-pointer"
          >
            Date
            {sortBy === "date" && (
              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            )}
          </TableHead>
          <TableHead className="text-center">Items</TableHead>
          <TableHead
            onClick={() => handleSort("total")}
            className="cursor-pointer text-right"
          >
            Total
            {sortBy === "total" && (
              <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            )}
          </TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden lg:table-cell">Payment</TableHead>
          <TableHead className="hidden md:table-cell">Delivery Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.orderNumber}</TableCell>
            <TableCell>
              {new Date(order.orderDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-center">
              {order?.orderItemCount}
            </TableCell>
            <TableCell className="text-right">
              {formatNumbers(true, order?.totalAmount)}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge
                variant="outline"
                className={getOrderStatusColor(order?.status)}
              >
                {getOrderStatusText(order.status)}
              </Badge>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <Badge
                variant="outline"
                className={getPaymentStatusColor(order?.paymentStatus)}
              >
                {getPaymentStatusText(order?.paymentStatus)}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order && order.deliveryDate
                ? new Date(order.deliveryDate).toLocaleDateString()
                : "-"}
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
                  <DropdownMenuItem>View order</DropdownMenuItem>
                  <DropdownMenuItem>Download invoice</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Reorder</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

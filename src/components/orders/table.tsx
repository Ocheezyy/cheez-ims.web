import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Order } from "@/types.ts";
import {
  formatNumbers,
  getOrderStatusColor,
  getOrderStatusText,
  getPaymentStatusColor,
  getPaymentStatusText,
} from "@/lib/utils.ts";
import FullTableSkeleton from "@/components/table-skeleton.tsx";

interface OrdersTableProps {
  orderData: Order[];
  isLoading: boolean;
}

export function OrdersTable({ orderData, isLoading }: OrdersTableProps) {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) return <FullTableSkeleton />;

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSorting(sorting === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSorting("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const sortedData = [...orderData].sort((a, b) => {
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

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedItems.length} orders selected
              </span>
              <Button variant="outline" size="sm" className="h-8">
                Print Invoices
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Update Status
              </Button>
            </div>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  selectedItems.length === paginatedData.length &&
                  paginatedData.length > 0
                }
                onCheckedChange={handleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead
              onClick={() => handleSort("orderNumber")}
              className="cursor-pointer"
            >
              Order
              {sortBy === "orderNumber" && (
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead
              onClick={() => handleSort("customer")}
              className="cursor-pointer"
            >
              Customer
              {sortBy === "customer" && (
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead
              onClick={() => handleSort("date")}
              className="cursor-pointer hidden md:table-cell"
            >
              Date
              {sortBy === "date" && (
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Payment</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Items
            </TableHead>
            <TableHead
              onClick={() => handleSort("total")}
              className="cursor-pointer text-right"
            >
              Total
              {sortBy === "total" && (
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((order) => (
            <TableRow
              key={order.id}
              className={selectedItems.includes(order.id) ? "bg-muted/50" : ""}
            >
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(order.id)}
                  onCheckedChange={() => handleSelectItem(order.id)}
                  aria-label={`Select order ${order.orderNumber}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <Link
                  to={`/orders/$orderId`}
                  params={{ orderId: order.id }}
                  className="hover:underline"
                >
                  {order.orderNumber}
                </Link>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {order.user.firstName + " " + order.user.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground hidden md:block">
                    {order.user.email}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge
                  variant="outline"
                  className={getOrderStatusColor(order.status)}
                >
                  {getOrderStatusText(order.status)}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge
                  variant="outline"
                  className={getPaymentStatusColor(order.paymentStatus)}
                >
                  {getPaymentStatusText(order.paymentStatus)}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {order.orderItems?.length || 0}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatNumbers(true, order.totalAmount)}
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
                    <DropdownMenuItem asChild>
                      <Link
                        to={`/orders/$orderId`}
                        params={{ orderId: order.id }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Print invoice</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Send email</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="p-4 border-t">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;

              // Show first page, last page, and pages around current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNumber);
                      }}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              // Show ellipsis for gaps
              if (
                (pageNumber === 2 && currentPage > 3) ||
                (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

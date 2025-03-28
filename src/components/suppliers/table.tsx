import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpDown,
  Building,
  Edit,
  Eye,
  MoreHorizontal,
  Star,
  Trash,
} from "lucide-react";

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
import { Supplier } from "@/types.ts";
import {
  formatPhoneNumber,
  getSupplierStatusColor,
  getSupplierStatusText,
} from "@/lib/utils.ts";
import FullTableSkeleton from "@/components/table-skeleton.tsx";

interface SuppliersTableProps {
  data?: Supplier[];
  isLoading: boolean;
}

export function SuppliersTable({ data, isLoading }: SuppliersTableProps) {
  const [sorting, setSorting] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
                {selectedItems.length} suppliers selected
              </span>
              <Button variant="outline" size="sm" className="h-8">
                Export
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Email
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
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Supplier
              {sortBy === "name" && (
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead className="hidden lg:table-cell">Contact</TableHead>
            <TableHead className="hidden xl:table-cell">Location</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead
              onClick={() => handleSort("rating")}
              className="cursor-pointer text-center"
            >
              Rating
              {sortBy === "rating" && (
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              )}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((supplier) => (
            <TableRow
              key={supplier.id}
              className={
                selectedItems.includes(supplier.id) ? "bg-muted/50" : ""
              }
            >
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(supplier.id)}
                  onCheckedChange={() => handleSelectItem(supplier.id)}
                  aria-label={`Select ${supplier.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="bg-muted rounded-md p-2 flex items-center justify-center">
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <Link
                      to={`/suppliers/$supplierId`}
                      params={{ supplierId: supplier.id }}
                      className="font-medium hover:underline"
                    >
                      {supplier.name}
                    </Link>
                    <div className="text-sm text-muted-foreground hidden md:block">
                      {supplier.contactEmail}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <div>
                  <div className="font-medium">
                    {formatPhoneNumber(supplier.phone)}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                {supplier.address.split(",").slice(1, 3).join(", ")}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant="outline"
                  className={getSupplierStatusColor(supplier.status)}
                >
                  {getSupplierStatusText(supplier.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <span className="font-medium mr-1">{supplier.rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </div>
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
                        to={`/suppliers/$supplierId`}
                        params={{ supplierId: supplier.id }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit supplier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete supplier
                    </DropdownMenuItem>
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

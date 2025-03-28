import { useState } from "react";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from "@/types.ts";
import { getProductStatusColor, getProductStatusText } from "@/lib/utils.ts";

const data = [
  {
    id: "INV001",
    name: "Wireless Headphones",
    sku: "WH-BT-001",
    category: "Electronics",
    subcategory: "Audio",
    quantity: 45,
    price: 89.99,
    status: "In Stock",
  },
  {
    id: "INV002",
    name: "USB-C Cables (3-pack)",
    sku: "USB-C-3PK",
    category: "Accessories",
    subcategory: "Cables",
    quantity: 120,
    price: 19.99,
    status: "In Stock",
  },
  {
    id: "INV003",
    name: "Laptop Stand",
    sku: "LS-ADJ-001",
    category: "Office",
    subcategory: "Ergonomics",
    quantity: 15,
    price: 49.99,
    status: "Low Stock",
  },
  {
    id: "INV004",
    name: "Wireless Keyboard",
    sku: "KB-WL-001",
    category: "Electronics",
    subcategory: "Input Devices",
    quantity: 30,
    price: 69.99,
    status: "In Stock",
  },
  {
    id: "INV005",
    name: "HDMI Adapter",
    sku: "HDMI-ADP-4K",
    category: "Accessories",
    subcategory: "Adapters",
    quantity: 10,
    price: 24.99,
    status: "Low Stock",
  },
  {
    id: "INV006",
    name: "Bluetooth Speaker",
    sku: "SPK-BT-001",
    category: "Electronics",
    subcategory: "Audio",
    quantity: 25,
    price: 79.99,
    status: "In Stock",
  },
  {
    id: "INV007",
    name: "Wireless Mouse",
    sku: "MS-WL-001",
    category: "Electronics",
    subcategory: "Input Devices",
    quantity: 40,
    price: 39.99,
    status: "In Stock",
  },
  {
    id: "INV008",
    name: "Monitor Stand",
    sku: "MS-ADJ-001",
    category: "Office",
    subcategory: "Ergonomics",
    quantity: 0,
    price: 59.99,
    status: "Out of Stock",
  },
  {
    id: "INV009",
    name: "Wireless Charger",
    sku: "CHRG-WL-10W",
    category: "Accessories",
    subcategory: "Charging",
    quantity: 18,
    price: 34.99,
    status: "In Stock",
  },
  {
    id: "INV010",
    name: "Smart Watch",
    sku: "SW-BT-001",
    category: "Electronics",
    subcategory: "Wearables",
    quantity: 5,
    price: 199.99,
    status: "Low Stock",
  },
  {
    id: "INV011",
    name: "External SSD 1TB",
    sku: "SSD-EXT-1TB",
    category: "Storage",
    subcategory: "External Drives",
    quantity: 12,
    price: 149.99,
    status: "In Stock",
  },
  {
    id: "INV012",
    name: "Mechanical Keyboard",
    sku: "KB-MECH-RGB",
    category: "Electronics",
    subcategory: "Input Devices",
    quantity: 8,
    price: 129.99,
    status: "Low Stock",
  },
];

interface InventoryGridViewProps {
  productData: Product[];
}

export function InventoryGridView({ productData }: InventoryGridViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = productData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedData.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full bg-muted">
                <img
                  src={`/placeholder.svg?height=200&width=300}`}
                  alt={item.name!!}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        Update stock
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={getProductStatusColor(item.status)}
                  >
                    {getProductStatusText(item.status)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    SKU: {item.sku}
                  </span>
                </div>
                <h3 className="font-semibold truncate">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {item.category.name}
                  </span>
                  <span className="font-medium">${item.price?.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <div className="text-sm">
                <span className="font-medium">{item.stockQuantity}</span> in
                stock
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
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

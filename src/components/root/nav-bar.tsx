import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Package, Menu, X } from "lucide-react";
import { Route as InventoryRoute } from "@/routes/inventory";
import { Route as OrdersRoute } from "@/routes/orders";
import { Route as SuppliersRoute } from "@/routes/suppliers";
import { Route as ReportsRoute } from "@/routes/reports";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils.ts";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  currentRoute: string;
}

export function NavBar({ className, currentRoute, ...props }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const routes = [
    { href: "/", label: "Dashboard", to: "/" },
    { href: "/inventory", label: "Inventory", to: InventoryRoute.to },
    { href: "/orders", label: "Orders", to: OrdersRoute.to },
    { href: "/suppliers", label: "Suppliers", to: SuppliersRoute.to },
    { href: "/reports", label: "Reports", to: ReportsRoute.to },
  ];

  return (
    <nav className={cn("flex items-center", className)} {...props}>
      {/* Logo - always visible */}
      <Link
        to="/"
        className="flex items-center space-x-2 font-medium text-lg mr-6"
      >
        <Package className="h-5 w-5" />
        <span>InventoryPro</span>
      </Link>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="flex items-center space-x-2 font-medium text-lg"
                onClick={() => setOpen(false)}
              >
                <Package className="h-5 w-5" />
                <span>InventoryPro</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="flex flex-col space-y-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  to={route.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary py-2",
                    currentRoute === route.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop navigation links */}
      <div className="hidden md:flex md:items-center md:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.to}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              currentRoute === route.href
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

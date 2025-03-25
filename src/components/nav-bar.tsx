import type React from "react"
import { Link } from '@tanstack/react-router'
import { Package } from "lucide-react"

import { cn } from "@/lib/utils"

export function NavBar({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
  <Link to="/" className="flex items-center space-x-2 font-medium text-lg">
  <Package className="h-5 w-5" />
    <span>InventoryPro</span>
    </Link>
    <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
    Dashboard
    </Link>
    <Link to="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    Inventory
    </Link>
    <Link to="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    Orders
    </Link>
    <Link to="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    Suppliers
    </Link>
    <Link to="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    Reports
    </Link>
    </nav>
)
}
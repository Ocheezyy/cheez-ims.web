import type { DashboardOverviewStats } from "@/types.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Activity,
  Box,
  DollarSign,
  ShoppingCart,
  LucideIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { formatNumbers } from "@/lib/utils.ts";

interface OverviewStatsCardsProps {
  data?: DashboardOverviewStats;
  isLoading: boolean;
}

const cardsLookupArr: {
  header: string;
  key: keyof DashboardOverviewStats;
  placeholder: string;
  icon: LucideIcon;
}[] = [
  {
    header: "Total Inventory",
    key: "totalInventory",
    placeholder: "+12% from last month",
    icon: Box,
  },
  {
    header: "Low Stock Items",
    key: "lowStockInventory",
    placeholder: "+1 since yesterday",
    icon: ShoppingCart,
  },
  {
    header: "Total Value",
    key: "totalValue",
    placeholder: "+7% from last month",
    icon: DollarSign,
  },
  {
    header: "Active Orders",
    key: "activeOrders",
    placeholder: "+14 since yesterday",
    icon: Activity,
  },
];

export function OverviewStatsCards({
  data,
  isLoading,
}: OverviewStatsCardsProps) {
  return cardsLookupArr.map((cardLookup) => {
    const valueStr =
      cardLookup.key === "totalValue"
        ? formatNumbers(true, data?.[cardLookup.key])
        : formatNumbers(false, data?.[cardLookup.key]);

    return (
      <Card key={cardLookup.key}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              cardLookup.header
            )}
          </CardTitle>
          <cardLookup.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? <Skeleton className="h-4 w-[100px]" /> : valueStr}
          </div>
          {isLoading ? (
            <Skeleton className="h-4 w-[100px]" />
          ) : (
            <p className="text-xs text-muted-foreground">
              cardLookup.placeholder
            </p>
          )}
        </CardContent>
      </Card>
    );
  });
}

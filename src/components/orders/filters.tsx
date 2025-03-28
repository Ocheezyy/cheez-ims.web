import type React from "react";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { OrderStatus, PaymentStatus } from "@/types.ts";

export function OrdersFilters({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);

  const [paymentStatusOpen, setPaymentStatusOpen] = useState(false);
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<
    number[]
  >([]);

  const statuses = [
    { label: "Pending", value: OrderStatus.Pending },
    { label: "Processing", value: OrderStatus.Processing },
    { label: "Shipped", value: OrderStatus.Shipped },
    { label: "Delivered", value: OrderStatus.Delivered },
    { label: "Cancelled", value: OrderStatus.Canceled },
    { label: "Returned", value: OrderStatus.Returned },
  ];

  const paymentStatuses = [
    { label: "Paid", value: PaymentStatus.Paid },
    { label: "Pending", value: PaymentStatus.Pending },
    { label: "Refunded", value: PaymentStatus.Refunded },
  ];

  return (
    <div className={cn("pb-4", className)}>
      <div className="space-y-4">
        <div className="font-medium">Filters</div>
        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Order Status</div>
            <Popover open={statusOpen} onOpenChange={setStatusOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={statusOpen}
                  className="w-full justify-between"
                >
                  {selectedStatuses.length > 0
                    ? `${selectedStatuses.length} selected`
                    : "Select status"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {statuses.map((status) => {
                        const isSelected = selectedStatuses.includes(
                          status.value,
                        );
                        return (
                          <CommandItem
                            key={status.value}
                            onSelect={() => {
                              if (isSelected) {
                                setSelectedStatuses(
                                  selectedStatuses.filter(
                                    (value) => value !== status.value,
                                  ),
                                );
                              } else {
                                setSelectedStatuses([
                                  ...selectedStatuses,
                                  status.value,
                                ]);
                              }
                            }}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible",
                              )}
                            >
                              <Check className="h-4 w-4" />
                            </div>
                            <span>{status.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    {selectedStatuses.length > 0 && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => setSelectedStatuses([])}
                            className="justify-center text-center"
                          >
                            Clear filters
                          </CommandItem>
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedStatuses.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedStatuses.map((status) => {
                  const statusLabel = statuses.find(
                    (s) => s.value === status,
                  )?.label;
                  return (
                    <Badge
                      key={status}
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {statusLabel}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Payment Status</div>
            <Popover
              open={paymentStatusOpen}
              onOpenChange={setPaymentStatusOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={paymentStatusOpen}
                  className="w-full justify-between"
                >
                  {selectedPaymentStatuses.length > 0
                    ? `${selectedPaymentStatuses.length} selected`
                    : "Select payment status"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {paymentStatuses.map((status) => {
                        const isSelected = selectedPaymentStatuses.includes(
                          status.value,
                        );
                        return (
                          <CommandItem
                            key={status.value}
                            onSelect={() => {
                              if (isSelected) {
                                setSelectedPaymentStatuses(
                                  selectedPaymentStatuses.filter(
                                    (value) => value !== status.value,
                                  ),
                                );
                              } else {
                                setSelectedPaymentStatuses([
                                  ...selectedPaymentStatuses,
                                  status.value,
                                ]);
                              }
                            }}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible",
                              )}
                            >
                              <Check className="h-4 w-4" />
                            </div>
                            <span>{status.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    {selectedPaymentStatuses.length > 0 && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => setSelectedPaymentStatuses([])}
                            className="justify-center text-center"
                          >
                            Clear filters
                          </CommandItem>
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedPaymentStatuses.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedPaymentStatuses.map((status) => {
                  const statusLabel = paymentStatuses.find(
                    (s) => s.value === status,
                  )?.label;
                  return (
                    <Badge
                      key={status}
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {statusLabel}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium">Price Range</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label
                  htmlFor="min-price"
                  className="text-xs text-muted-foreground"
                >
                  Min
                </label>
                <input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="max-price"
                  className="text-xs text-muted-foreground"
                >
                  Max
                </label>
                <input
                  id="max-price"
                  type="number"
                  placeholder="1000"
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <Separator />

          <Button className="w-full" variant="outline">
            Reset Filters
          </Button>

          <Button className="w-full">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
}

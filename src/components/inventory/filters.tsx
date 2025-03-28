import type React from "react";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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
import { Slider } from "@/components/ui/slider";
import { Category, ProductStatus } from "@/types.ts";

interface InventoryFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryData: Category[];
}

export function InventoryFilters({
  className,
  categoryData,
}: InventoryFilterProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);

  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = [
    { label: "Electronics", value: "electronics" },
    { label: "Accessories", value: "accessories" },
    { label: "Office", value: "office" },
    { label: "Computers", value: "computers" },
    { label: "Audio", value: "audio" },
    { label: "Cables", value: "cables" },
    { label: "Storage", value: "storage" },
  ];

  const statuses = [
    { label: "In Stock", value: ProductStatus.InStock },
    { label: "Low Stock", value: ProductStatus.LowStock },
    { label: "Out of Stock", value: ProductStatus.OutOfStock },
    { label: "Discontinued", value: ProductStatus.Discontinued },
  ];

  return (
    <div className={cn("pb-4", className)}>
      <div className="space-y-4">
        <div className="font-medium">Filters</div>
        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Category</div>
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  className="w-full justify-between"
                >
                  {selectedCategories.length > 0
                    ? `${selectedCategories.length} selected`
                    : "Select categories"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandList>
                    <CommandEmpty>No categories found.</CommandEmpty>
                    <CommandGroup>
                      {categoryData.map((category) => {
                        const isSelected = selectedCategories.includes(
                          category.name!!,
                        );
                        return (
                          <CommandItem
                            key={category.name}
                            onSelect={() => {
                              if (isSelected) {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (value) => value !== category.name,
                                  ),
                                );
                              } else {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  category.name!!,
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
                            <span>{category.name}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    {selectedCategories.length > 0 && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => setSelectedCategories([])}
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
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedCategories.map((category) => {
                  const categoryLabel = categories.find(
                    (c) => c.value === category,
                  )?.label;
                  return (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {categoryLabel}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Status</div>
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
            <div className="text-sm font-medium">Price Range</div>
            <div className="pt-4 px-1">
              <Slider
                defaultValue={[0, 500]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
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
